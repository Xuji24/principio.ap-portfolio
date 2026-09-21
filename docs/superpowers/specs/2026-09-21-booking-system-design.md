# Booking System — Design

**Date:** 2026-09-21
**Repo:** `Xuji24/principio.ap-portfolio`
**Status:** Approved, ready for implementation planning
**Companion spec:** `2026-09-21-portfolio-redesign-design.md`

---

## 1. Purpose

Let a visitor book a call with Angelo directly from `/contact`, against his real
availability, without email round-trips.

Built in-house on the existing Supabase and Nodemailer stack rather than
embedding Cal.com. The trade-off was stated during design and accepted: a
self-built system is meaningfully more work and carries real correctness risk,
but it is also a portfolio artefact in its own right — "I built the booking
system this site runs on" is a strong Work entry.

**Success criteria:** it is impossible to double-book; no visitor's booking
activity is visible to any other visitor; the calendar reflects Angelo's actual
Google Calendar.

---

## 2. Principles

Three rules that drive most of the design below.

1. **Free/busy only.** The public API returns availability booleans and nothing
   else. A slot is open or it isn't; nobody can tell whether it's blocked
   because someone booked it or because Angelo is at the dentist. *Showing who
   booked what — the original request — is a privacy leak and is not built.*
2. **Fail closed.** If Google Calendar cannot be reached, affected slots are
   **hidden**, not offered. Losing an occasional booking is acceptable; being
   double-booked in front of a recruiter is not.
3. **The database enforces correctness, not the application.** Overlap
   prevention lives in a constraint, not in an `if`.

---

## 3. Data model

Four tables. **RLS denies all client access**; every read and write goes through
server route handlers using the service role key.

### 3.1 `availability_rules`

Recurring weekly windows, authored in Angelo's timezone.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `weekday` | smallint | 0–6, Sunday = 0 |
| `start_time` | time | e.g. `09:00` |
| `end_time` | time | e.g. `17:00` |
| `timezone` | text | `Asia/Manila` |
| `active` | boolean | soft disable |

### 3.2 `blackout_dates`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `starts_at` | timestamptz | |
| `ends_at` | timestamptz | |
| `reason` | text | private, never returned publicly |

### 3.3 `bookings`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `slot_start` | timestamptz | UTC |
| `slot_end` | timestamptz | UTC |
| `name` | text | |
| `email` | citext | |
| `subject` | text | reuses the contact presets |
| `message` | text | capped length |
| `status` | enum | `pending` \| `confirmed` \| `cancelled` |
| `confirm_token` | text | single-use, hashed |
| `cancel_token` | text | single-use, hashed |
| `google_event_id` | text | set on confirm |
| `expires_at` | timestamptz | `pending` only, 15 min |
| `created_at` | timestamptz | |

### 3.4 `google_tokens`

Single row. `refresh_token` (encrypted), `access_token`, `expires_at`.

### 3.5 The constraint that matters

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE bookings ADD CONSTRAINT no_overlapping_bookings
  EXCLUDE USING gist (tstzrange(slot_start, slot_end) WITH &&)
  WHERE (status <> 'cancelled');
```

Two people clicking the same slot in the same second is a race that an
application-level "is it free?" check loses eventually — the gap between the
read and the write. This makes Postgres reject the second insert outright. The
second visitor gets "just taken, pick another"; Angelo never gets two people on
one call.

---

## 4. Slot computation

**Slots are computed on request, never stored.** A materialised slot table needs
a cron job and drifts out of sync with the rules that generated it.

For a requested date range:

1. Expand `availability_rules` across the range in Angelo's timezone.
2. Subtract `blackout_dates`.
3. Subtract `bookings` where `status IN ('pending','confirmed')`.
4. Subtract Google Calendar busy intervals (FreeBusy).
5. Apply a minimum notice window (no same-day, configurable).
6. Return remaining slots as UTC instants.

**Time handling:** everything is stored and transported as `timestamptz` in UTC.
Rules are authored in `Asia/Manila`; the visitor sees slots rendered in their
own detected timezone with an explicit label and an override. Naive local times
are how booking systems break across DST.

**No duration choice.** The visitor never picks a meeting length — the card
reads "However long it takes." Slots come off a fixed server-side grid so they
cannot overlap, but the length is not a user-facing concept.

---

## 5. Google Calendar sync

Full two-way sync, v1.

**Auth:** one-time server-side OAuth by Angelo. Refresh token stored encrypted
in `google_tokens`. Scope: `calendar.events` + `calendar.readonly`.

**Read:** FreeBusy query for the requested range on every slot lookup, cached
briefly (≤60 s) to avoid hammering the API on month navigation.

**Write:** on confirmation, create the event with the visitor as an attendee and
store `google_event_id`. On cancellation, delete it.

**Failure behaviour:** if FreeBusy errors or times out, the affected range
returns **no slots** rather than unverified ones, per §2.2. Surface a quiet "couldn't
load availability, try again" state rather than an empty-looking calendar.

---

## 6. Booking flow

```
pick date → pick time → details → HOLD (15 min) → verify email → CONFIRMED
                                       ↓ expires
                                    released
```

1. Visitor picks a date, then a time (two steps, see §8).
2. Submits name, email, subject, message.
3. Row inserted as `pending` with `expires_at = now() + 15 min`. The exclusion
   constraint holds the slot against anyone else.
4. Verification email sent with a single-use `confirm_token` link.
5. On click: status → `confirmed`, Google event created, confirmation email to
   both parties with an `.ics` attachment.
6. Expired `pending` rows are released — via a scheduled cleanup **and**
   opportunistically filtered at query time, so an un-run cron never blocks a
   slot permanently.

**Why verification and not just confirmation:** without it, one person with a
script can lock the entire month using addresses that don't exist. The hold is
what makes the booking real.

**Cancellation:** single-use `cancel_token` link in the confirmation email →
`/booking/cancel?token=…`. Sets `cancelled`, deletes the Google event, frees the
slot (the constraint's `WHERE status <> 'cancelled'` allows reuse).

---

## 7. Abuse prevention

- Per-IP rate limit on booking creation and on the slot endpoint
- Hidden honeypot field
- Max concurrent `pending` bookings per email and per IP
- Length caps on `name`, `subject`, `message`
- Tokens are single-use, hashed at rest, and expire

---

## 8. Public UI

Lives in the right-hand column of `/contact`, narrower than the form
(`0.78fr` vs `1.42fr`) so it reads as the secondary option.

**Two steps inside one fixed-height container** — picking a date slides the
calendar out and the times in. The card never changes height, so nothing below
it jumps. A Back control returns to the grid with the date still selected.

**Step 1 — calendar.** Month grid, Monday-first, with **availability density
dots** under each day (1 / 2 / 3 dots for 1–2 / 3–4 / 5+ free slots). A day with
no dots looks identical whether fully booked or on holiday.

**Step 2 — times.** Two-column slot list for the chosen day, then the booking
button and the hold notice.

**A peeking/sitting cat sits in the card header at 46 px**, sharing the rig from
the redesign spec §5. Click → raises a paw and waves.

### 8.1 Calendar implementation

Use **react-day-picker** (the engine under shadcn's Calendar) for grid
generation across month boundaries, arrow-key navigation, focus management,
disabled-date logic, week-start and locale. That is fiddly correctness worth not
rewriting.

**Replace the caption entirely** via `components={{ MonthCaption }}`.
shadcn's `captionLayout="dropdown"` renders native `<select>` elements, and a
native select's popup is drawn by the operating system — CSS cannot reach inside
it, so it would appear as an OS listbox in the middle of the palette. The
replacement is a themed popover with a year stepper and a 3×4 month grid.

**New dependencies:** `react-day-picker`, `date-fns`, plus `clsx` /
`tailwind-merge` / `lib/utils.ts` from the redesign spec. ~40 KB gzipped,
lazy-loaded so it costs only on `/contact`.

---

## 9. Admin

Protected `/admin` route (auth via Supabase Auth, single user).

- Weekly availability editor for `availability_rules`
- Blackout date picker
- Upcoming bookings list with cancel
- Google account connect / reconnect status

Built in the same dashboard shell so it reuses the design system.

---

## 10. API surface

All under `app/api/booking/`.

| Route | Method | Returns |
|---|---|---|
| `/slots?from=&to=&tz=` | GET | Free slots + per-day density. **Booleans and instants only.** |
| `/hold` | POST | Creates `pending`, sends verification. `409` on constraint violation. |
| `/confirm` | POST | Token → `confirmed`, creates Google event |
| `/cancel` | POST | Token → `cancelled`, deletes Google event |
| `/admin/*` | — | Authenticated CRUD for rules, blackouts, bookings |

---

## 11. Environment

```
CONTACT_TO=principio.ap@gmail.com
SUPABASE_SERVICE_ROLE_KEY=        # server only, never exposed
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GOOGLE_CALENDAR_ID=               # usually "primary"
BOOKING_TIMEZONE=Asia/Manila
BOOKING_HOLD_MINUTES=15
BOOKING_MIN_NOTICE_HOURS=24
```

---

## 12. Build order

1. Schema, constraint, RLS
2. Slot computation (rules + blackouts + bookings; no Google yet)
3. Public calendar UI against that
4. Google OAuth and FreeBusy read
5. Hold → verify → confirm flow with email
6. Google event write, `.ics`, cancellation
7. Abuse hardening
8. `/admin`

Steps 1–3 are independently shippable behind the "coming soon" state in the
redesign, so `/contact` is never blocked on OAuth.

## 13. Open items

1. **Minimum notice** defaulted to 24 h — confirm.
2. **Slot grid granularity** (30 min assumed) — confirm. Not visitor-facing, but
   it determines how many slots a day yields.
3. **Google account** to connect — `principio.ap@gmail.com` or
   `principioangelo24@gmail.com`.
