import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ThemeContextProvider from "@/components/ThemeContext";
import { Sidebar, NAV_ITEMS } from "./Sidebar";

vi.mock("next/navigation", () => ({ usePathname: () => "/work" }));

function renderSidebar(props?: React.ComponentProps<typeof Sidebar>) {
  return render(
    <ThemeContextProvider>
      <Sidebar {...props} />
    </ThemeContextProvider>,
  );
}

describe("Sidebar", () => {
  it("renders all six routes", () => {
    renderSidebar();
    expect(NAV_ITEMS).toHaveLength(6);
    for (const item of NAV_ITEMS) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("marks the current route with aria-current", () => {
    renderSidebar();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
  });

  it("uses a nav landmark", () => {
    renderSidebar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("shows the visit count when provided", () => {
    renderSidebar({ viewCount: 4804 });
    expect(screen.getByText("4,804")).toBeInTheDocument();
  });
});
