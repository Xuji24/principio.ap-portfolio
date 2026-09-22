import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("renders a required subject field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
  });

  it("keeps submit disabled until every required field is filled", async () => {
    render(<ContactForm />);
    const submit = screen.getByRole("button", { name: /send message/i });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/name/i), "Jane");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/message/i), "Hello there");
    expect(submit).toBeDisabled(); // subject still empty

    await userEvent.type(screen.getByLabelText(/subject/i), "Job opportunity");
    expect(submit).toBeEnabled();
  });

  it("fills the subject from a preset chip", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: "Job opportunity" }));
    expect(screen.getByLabelText(/subject/i)).toHaveValue("Job opportunity");
  });
});
