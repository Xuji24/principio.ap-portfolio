import AboutPage from "@/components/pages/about/AboutPage";

export default function About() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white dark:bg-black">
      <div className="w-full max-w-7xl px-6 lg:px-16 py-20">
        <AboutPage />
      </div>
    </main>
  );
}
