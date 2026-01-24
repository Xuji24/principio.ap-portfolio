import ContactPage from "@/components/pages/contact/ContactPage";

export default function Contact() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-black">
      <div className="w-full max-w-5xl px-6 lg:px-16 py-20">
        <ContactPage />
      </div>
    </main>
  );
}
