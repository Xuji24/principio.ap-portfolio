import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar, NAV_ITEMS } from "./Sidebar";

vi.mock("next/navigation", () => ({ usePathname: () => "/work" }));

describe("Sidebar", () => {
  it("renders all six routes", () => {
    render(<Sidebar />);
    expect(NAV_ITEMS).toHaveLength(6);
    for (const item of NAV_ITEMS) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("marks the current route with aria-current", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
  });

  it("uses a nav landmark", () => {
    render(<Sidebar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
