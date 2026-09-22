import { RouteHeader } from "@/components/ui/RouteHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { BookingPlaceholder } from "@/components/contact/BookingPlaceholder";
import { LinkTiles } from "@/components/contact/LinkTiles";

export const metadata = { title: "Contact — Angelo Principio" };

export default function ContactPage() {
  return (
    <>
      <RouteHeader crumb="Contact" title="Let's work together"
        subtitle="Send a message, or put a call straight in my calendar." />
      <div className="grid grid-cols-1 lg:grid-cols-[1.42fr_.78fr] gap-3.5 items-start">
        <ContactForm />
        <BookingPlaceholder />
      </div>
      <LinkTiles />
    </>
  );
}
