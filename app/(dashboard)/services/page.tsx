import { ServicesGrid } from "@/components/services/ServicesGrid";
import { getServices } from "@/lib/content/services";

export const metadata = { title: "Services — Angelo Principio" };

export default function ServicesPage() {
  return (
    <ServicesGrid subtitle={`${getServices().length} ways I can help you ship faster.`} />
  );
}
