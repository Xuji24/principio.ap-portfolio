import Link from "next/link";
import { CatSvg } from "@/components/cat/CatSvg";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center bg-paper px-6 text-center">
      <div>
        <div className="w-20 mx-auto"><CatSvg /></div>
        <h1 className="font-display font-extrabold text-2xl text-ink mt-4">Nothing here</h1>
        <p className="text-[11px] text-muted mt-2">That page doesn&apos;t exist.</p>
        <Link href="/" className="inline-block mt-5 h-9 px-5 leading-9 rounded-lg bg-ink text-paper font-display font-semibold text-[11px] elev-sm">
          Back to overview
        </Link>
      </div>
    </div>
  );
}
