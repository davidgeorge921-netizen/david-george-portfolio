"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const skills = ["Photography", "Lighting", "Retouching", "Capture One", "Lightroom", "Photoshop", "Color Grading"];

const contactLinks = [
  { icon: Mail, label: "Email", href: "mailto:davidgeorge921@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/davidgeorge" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/fireshot.studios/" },
  { icon: Download, label: "Resume", href: "/David_George_Resume.pdf" }
];

const story = [
  {
    title: "Where I Started",
    copy: "My journey began at 16, when my father invested in my first DSLR despite the financial challenge. That camera became the start of a daily practice in light, composition, and editing."
  },
  {
    title: "How I Built Experience",
    copy: "I built my foundation through church events, school programs, weddings, fashion editorials, model portfolios, commercial productions, and an internship with a production house in Kerala."
  },
  {
    title: "Automotive + Commercial Work",
    copy: "In Oman, I worked full-time with 3DMax Media, producing automotive and commercial imagery with agencies, production teams, and event crews across launch, motorsport, and promotional assignments."
  },
  {
    title: "Philosophy",
    copy: "I focus on precision, movement, branding, and emotion. I do not just photograph vehicles or people; I capture the engineering, trust, and stories that make them memorable."
  }
];

export function AboutStory() {
  return (
    <section id="about" className="bg-ink px-5 py-16 text-bone light:bg-bone light:text-ink md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-24"
        >
          <div className="group relative aspect-[4/3] max-h-[620px] overflow-hidden bg-black md:aspect-[4/5]">
            <Image
              src="/images/david-george-portrait.jpg"
              alt="David George holding a camera in formal black tie"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover transition duration-700 ease-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />
          </div>
          <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 light:border-black/10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">David George</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">About / Compact Profile</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {story.map((item) => (
                <article key={item.title} className="border-t border-white/10 pt-5 light:border-black/10">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62 light:text-black/62">{item.copy}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 border-t border-white/10 pt-6 light:border-black/10"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-wideTesla text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black light:border-black/20 light:text-black/70 light:hover:border-black light:hover:bg-black light:hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 border-t border-white/10 pt-6 light:border-black/10"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wideTesla text-white/45 light:text-black/45">Contact</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between gap-4 rounded-full border border-white/25 px-6 py-4 text-sm font-semibold uppercase tracking-wideTesla transition duration-300 hover:border-white hover:bg-white hover:text-black light:border-black/20 light:hover:border-black light:hover:bg-black light:hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} />
                    {label}
                  </span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
