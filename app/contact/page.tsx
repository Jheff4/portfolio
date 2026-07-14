"use client";

// Contact page — "use client" for:
// 1. Boxes: motion animation (framer motion, browser-only)
// 2. Form: controlled inputs with useState, form submission
//
// The Boxes component renders 15,000 motion.div cells. They're animatable on hover
// but render as a static grid at rest — the performance cost is the initial mount,
// not ongoing re-renders. The radial-gradient mask hides the edges cleanly.

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Boxes } from "@/components/ui/background-boxes";
import { contactPageStyles as s } from "@/lib/styles";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Floating label: lift when field is focused OR has a value
  const getLabelClass = (field: keyof FormData) =>
    focused === field || formData[field]
      ? `${s.formLabelBase} ${s.formLabelFocused}`
      : `${s.formLabelBase} ${s.formLabelUnfocused}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // The three values below are public EmailJS identifiers, read from env.
      // templateParams keys must match the {{variables}} in your EmailJS template.
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>

        {/* Animated boxes background — radial mask dissolves the edges */}
        <div className={s.formOuterContainer}>
          <div className={s.backgroundOverlay} />
          <Boxes />

          <div className="relative z-10 w-full px-6 py-12 md:px-12 md:py-16">

            {/* Header */}
            <div className={s.headerContainer}>
              <h1 className={s.headerTitle}>Get in Touch</h1>
              <p className={s.headerSubtitle}>
                Have a project in mind or just want to say hi? I&apos;d love to
                hear from you.
              </p>
            </div>

            {/* Contact method cards — Email + Twitter */}
            <div className={s.contactMethodsGrid}>
              <a
                href="mailto:ogbevoenetinosa@gmail.com"
                className={s.contactCard}
              >
                <div className={s.contactIconContainer}>
                  <svg
                    className={s.contactIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className={s.contactLabel}>Email</p>
                  <p className={s.contactValue}>ogbevoenetinosa@gmail.com</p>
                </div>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={s.contactCard}
              >
                <div className={s.contactIconContainer}>
                  <svg
                    className={s.contactIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <p className={s.contactLabel}>Twitter</p>
                  <p className={s.contactValue}>@Etinosa</p>
                </div>
              </a>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className={s.formContainer}>
              <div className={s.formGrid}>
                {/* Name */}
                <div className={s.formFieldContainer}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={s.formInput}
                    placeholder="John Doe"
                    required
                  />
                  <label htmlFor="name" className={getLabelClass("name")}>
                    Name
                  </label>
                </div>

                {/* Email */}
                <div className={s.formFieldContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={s.formInput}
                    placeholder="john@example.com"
                    required
                  />
                  <label htmlFor="email" className={getLabelClass("email")}>
                    Email
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className={s.formFieldContainer}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className={s.formInput}
                  placeholder="Project Collaboration"
                  required
                />
                <label htmlFor="subject" className={getLabelClass("subject")}>
                  Subject
                </label>
              </div>

              {/* Message */}
              <div className={s.formFieldContainer}>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={6}
                  className={s.formTextarea}
                  placeholder="Tell me about your project..."
                  required
                />
                <label htmlFor="message" className={getLabelClass("message")}>
                  Message
                </label>
              </div>

              <div className={s.submitButtonContainer}>
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className={s.submitButton}
                >
                  <span className={s.submitButtonText}>
                    {status === "sent" ? "Message Sent!" : status === "sending" ? "Sending…" : "Send Message"}
                    {status === "idle" && (
                      <svg
                        className={s.submitButtonIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong sending your message. Please try again or
                  email me directly.
                </p>
              )}
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
