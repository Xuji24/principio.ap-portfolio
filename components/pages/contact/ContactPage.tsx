"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { Linkedin, Github, Mail, CheckCircle } from "lucide-react";

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
    <div className="w-full">
      <section className="py-24 animate-fade-in px-6 lg:px-16">
        {/* Header */}
        <div className="text-left mb-16">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-4">
            05 · CONTACT
          </p>
          <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[0.88] tracking-tighter mb-6">
            LET&apos;S CREATE
            <br />
            <span className="text-primary">SOMETHING</span>
            <br />
            AMAZING.
          </h1>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            Have a project in mind? Send me a message and let&apos;s discuss how
            we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Connect with me
            </h2>

            <div className="space-y-6 mb-12">
              <p className="text-muted-foreground leading-relaxed">
                Feel free to reach out through any of these channels. I usually
                respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:principio.ap@gmail.com"
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    principio.ap@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/angelo-principio-6b8380296/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Linkedin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    LinkedIn
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    Angelo Principio
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/Xuji24"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-secondary border border-border">
                  <Github size={20} className="text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    GitHub
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    Xuji24
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-slide-in-right"
          >
            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-widest uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-sm"
              />
            </div>

            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-widest uppercase">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry..."
                required
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-sm"
              />
            </div>

            <div
              className="animate-slide-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <label className="block text-xs font-bold text-muted-foreground mb-2 tracking-widest uppercase">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={6}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-none text-sm"
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
                className="w-full transition-all duration-300 hover:shadow-xl"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Mail size={20} />
              </Button>
            </div>

            {submitStatus === "success" && (
              <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 animate-slide-in-up">
                <p className="text-green-700 dark:text-green-300 font-semibold flex items-center gap-2">
                  <CheckCircle size={18} />
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 animate-slide-in-up">
                <p className="text-red-700 dark:text-red-300 font-semibold">
                  Failed to send message. Please try again or email me directly.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
