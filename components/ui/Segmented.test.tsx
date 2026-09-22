import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Segmented } from "./Segmented";

const options = [
  { value: "all", label: "All" },
  { value: "professional", label: "Professional" },
  { value: "personal", label: "Personal" },
];

describe("Segmented", () => {
  it("marks the selected option with aria-pressed", () => {
    render(<Segmented options={options} value="all" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Personal" })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChange with the clicked value", async () => {
    const onChange = vi.fn();
    render(<Segmented options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Professional" }));
    expect(onChange).toHaveBeenCalledWith("professional");
  });
});
