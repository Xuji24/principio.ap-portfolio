"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Linkedin, Github, Mail } from "lucide-react";

interface FormData {
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <section className="py-20 animate-fade-in px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-slide-in-left">
            <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
              Let&apos;s talk about
            </h1>
            <h2 className="text-4xl font-bold text-black dark:text-white mb-8">
              your next project
            </h2>

            <div className="flex gap-6 mb-12">
              <a
                href="https://www.linkedin.com/in/angelo-principio-6b8380296/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:scale-110 hover:-translate-y-1 active:scale-95"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://github.com/Xuji24"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:scale-110 hover:-translate-y-1 active:scale-95"
              >
                <Github size={28} />
              </a>
              <a
                href="mailto:principio.ap@gmail.com"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:scale-110 hover:-translate-y-1 active:scale-95"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-slide-in-right"
          >
            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200"
              />
            </div>

            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="subject"
                required
                className="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200"
              />
            </div>

            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                rows={6}
                className="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all duration-200 resize-none"
              />
            </div>

            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full transition-all duration-300 hover:shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                <Mail size={20} />
              </Button>
            </div>

            {submitStatus === "success" && (
              <p className="text-green-600 dark:text-green-400 text-center font-semibold animate-slide-in-up">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 dark:text-red-400 text-center font-semibold animate-slide-in-up">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
