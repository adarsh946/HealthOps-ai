import { useState, type ElementType } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  Github,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HealthOps AI — Hospital Operations, Optimized" },
      {
        name: "description",
        content:
          "AI-powered hospital operations for real-time queues, patient management, scheduling, and cross-team coordination.",
      },
      {
        property: "og:title",
        content: "HealthOps AI — Hospital Operations, Optimized",
      },
      {
        property: "og:description",
        content:
          "AI-powered operations for modern hospitals, built for speed and coordination.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "FAQ", href: "#faq" },
];

const problems = [
  { icon: Clock3, title: "Long patient wait times with no visibility" },
  { icon: Workflow, title: "Manual queue management wastes staff time" },
  { icon: BellRing, title: "No real-time coordination between departments" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI Queue Optimization",
    description:
      "LangGraph ReAct agent analyzes urgency, wait time, and doctor availability to optimize queue order in real time.",
  },
  {
    icon: Activity,
    title: "Real-time Updates",
    description:
      "Socket.io broadcasts queue changes instantly to all staff dashboards.",
  },
  {
    icon: Users,
    title: "Patient Management",
    description:
      "Add, search, and manage all patient records across departments.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Scheduling",
    description:
      "Track doctor availability and specializations with live status updates.",
  },
  {
    icon: CalendarDays,
    title: "Appointment Booking",
    description:
      "Book, confirm, and manage appointments with automated reminders.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based Access",
    description:
      "Admin, Doctor, Receptionist roles with granular permission control.",
  },
];

const steps = [
  [
    "Register your hospital",
    "Set up your workspace and invite your care team.",
  ],
  ["Connect daily operations", "Add patients, doctors, and book appointments."],
  ["Let AI optimize", "Your queue adapts intelligently in real time."],
];

const backendTech = [
  "Python",
  "FastAPI",
  "LangGraph",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Redis",
  "BullMQ",
];
const frontendTech = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Socket.io",
  "Render",
  "Vercel",
  "NeonDB",
  "Upstash",
];

const faqs = [
  {
    question: "Is this production-ready?",
    answer:
      "It's a portfolio-grade project built with production patterns — microservices, JWT auth, real-time updates, and AI agents. Not HIPAA-certified.",
  },
  {
    question: "What AI technology powers the queue?",
    answer:
      "LangGraph ReAct agents using Groq's llama-3.3-70b model analyze patient urgency, wait time, and doctor availability.",
  },
  {
    question: "Can multiple hospitals use this?",
    answer:
      "Yes — multi-tenancy is built in. Each hospital's data is fully isolated via hospitalId scoping.",
  },
  {
    question: "What roles are supported?",
    answer:
      "Admin, Doctor, Receptionist, and Nurse roles with different permission levels.",
  },
  {
    question: "Is the code open source?",
    answer: "Yes — the full codebase is on GitHub.",
  },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="HealthOps AI">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg",
          inverse ? "bg-primary-foreground/15" : "bg-primary"
        )}
      >
        <HeartPulse
          className={cn(
            "h-5 w-5",
            inverse ? "text-primary-foreground" : "text-primary-foreground"
          )}
        />
      </span>
      <span
        className={cn(
          "text-base font-bold",
          inverse ? "text-primary-foreground" : "text-foreground"
        )}
      >
        HealthOps{" "}
        <span
          className={inverse ? "text-primary-foreground/75" : "text-primary"}
        >
          AI
        </span>
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}

function IconTile({
  icon: Icon,
  tone = "brand",
}: {
  icon: ElementType;
  tone?: "brand" | "warning";
}) {
  return (
    <span
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-lg",
        tone === "brand"
          ? "bg-primary-soft text-primary"
          : "bg-warning-soft text-warning"
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

function DashboardPreview() {
  const patients = [
    { name: "Maya Thompson", type: "Emergency", time: "2 min", urgent: true },
    { name: "James Wilson", type: "Cardiology", time: "8 min", urgent: false },
    { name: "Sofia Martinez", type: "General", time: "14 min", urgent: false },
  ];
  return (
    <div className="relative mx-auto mt-14 max-w-5xl animate-rise">
      <div className="absolute inset-x-[12%] bottom-0 top-[20%] -z-10 rounded-full bg-primary/15 blur-3xl" />
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-preview">
        <div className="grid min-h-[410px] grid-cols-1 md:grid-cols-[190px_minmax(0,1fr)]">
          <aside className="hidden border-r border-border bg-dashboard-panel p-5 md:block">
            <Brand />
            <div className="mt-9 space-y-2 text-xs font-medium text-muted-foreground">
              {[
                "Overview",
                "Live Queue",
                "Appointments",
                "Patients",
                "Doctors",
              ].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5",
                    index === 1 && "bg-primary-soft text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      index === 1 ? "bg-primary" : "bg-muted-foreground/35"
                    )}
                  />
                  {item}
                </div>
              ))}
            </div>
          </aside>
          <div className="min-w-0 bg-background p-4 sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-5">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Thursday, 10 September
                </p>
                <p className="truncate text-lg font-bold text-foreground">
                  Good morning, Adarsh
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                System live
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Patients today", "128"],
                ["Active doctors", "24"],
                ["Avg. wait", "11m"],
                ["Queue health", "94%"],
              ].map(([label, value]) => (
                <div
                  className="rounded-lg border border-border bg-card p-3.5"
                  key={label}
                >
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold">AI-optimized queue</p>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <Sparkles className="h-3 w-3" />
                    Optimized now
                  </span>
                </div>
                <div className="space-y-2">
                  {patients.map((patient, index) => (
                    <div
                      key={patient.name}
                      className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 rounded-md bg-muted/60 p-2.5"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded bg-card text-[10px] font-bold text-muted-foreground">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">
                          {patient.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {patient.type}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-semibold",
                          patient.urgent
                            ? "text-warning"
                            : "text-muted-foreground"
                        )}
                      >
                        {patient.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-bold">Patient flow</p>
                <div className="mt-5 flex h-28 items-end gap-2">
                  {[
                    "h-[42%]",
                    "h-[65%]",
                    "h-[52%]",
                    "h-[85%]",
                    "h-[70%]",
                    "h-[96%]",
                    "h-[74%]",
                    "h-[88%]",
                  ].map((height, index) => (
                    <span
                      key={index}
                      className={cn("flex-1 rounded-t bg-primary/20", height)}
                    >
                      <span className="block h-1/3 rounded-t bg-primary" />
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                  <span>08:00</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechPill({ name, icon: Icon }: { name: string; icon: ElementType }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-xs transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm">
      <Icon className="h-4 w-4 text-primary" />
      {name}
    </span>
  );
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-nav backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
          <a href="#top" className="min-w-0">
            <Brand />
          </a>
          <nav
            className="hidden items-center justify-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild className="hidden h-9 shadow-none sm:inline-flex">
              <a href="#demo">Request Demo</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-border bg-background px-5 py-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 sm:hidden">
                <a href="#demo" onClick={() => setMenuOpen(false)}>
                  Request Demo
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-grid relative border-b border-border px-5 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Intelligent operations. Better patient care.
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground sm:text-5xl lg:text-7xl">
                AI-Powered Operations for{" "}
                <span className="text-primary">Modern Hospitals</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Manage patients, doctors, appointments, and queues in real time
                — with LangGraph AI agents optimizing your workflow
                automatically.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 shadow-primary">
                  <Link to="/dashboard">
                    View Live Demo <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6"
                >
                  <a href="#footer">
                    <Github />
                    View on GitHub
                  </a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground">
                {[
                  "8 Microservices",
                  "Real-time Queue AI",
                  "Multi-role RBAC",
                ].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="The challenge"
              title="Hospital Operations Are Broken"
              copy="Care teams deserve better than disconnected systems, manual triage, and operational blind spots."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {problems.map(({ icon, title }) => (
                <article
                  key={title}
                  className="group rounded-lg border border-warning/15 bg-warning-soft/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-warning/25 hover:shadow-card"
                >
                  <IconTile icon={icon} tone="warning" />
                  <h3 className="mt-5 text-base font-bold leading-6 text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Operational friction compounds quickly, affecting staff
                    performance and the patient experience.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-20 border-y border-border bg-section px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="One connected workspace"
              title="Everything your hospital needs, in one platform"
              copy="From intake to discharge, every team works from the same real-time operational picture."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon, title, description }) => (
                <article
                  key={title}
                  className="group rounded-lg border border-border bg-card p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
                >
                  <IconTile icon={icon} />
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore capability <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-20 px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Simple by design"
              title="How HealthOps AI works"
            />
            <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              <div className="absolute left-[16.6%] right-[16.6%] top-6 hidden h-px bg-border md:block" />
              {steps.map(([title, copy], index) => (
                <article key={title} className="relative text-center">
                  <span className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground shadow-primary">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tech-stack"
          className="scroll-mt-20 border-y border-border bg-section px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Engineered to scale"
              title="Built with production-grade technology"
              copy="A modern stack chosen for reliability, speed, and real-time performance."
            />
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Backend & AI
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {backendTech.map((name, index) => (
                    <TechPill
                      key={name}
                      name={name}
                      icon={index < 3 ? Bot : index < 6 ? ServerCog : Database}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Frontend & Infrastructure
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {frontendTech.map((name, index) => (
                    <TechPill
                      key={name}
                      name={name}
                      icon={index < 4 ? Code2 : Layers3}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Service architecture"
              title="8 independent microservices, one unified platform"
              copy="Each service scales independently while the gateway keeps every workflow connected."
            />
            <div className="overflow-hidden rounded-lg border border-border bg-card p-5 shadow-card sm:p-8">
              <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr_auto_2.4fr]">
                <ArchitectureBox
                  icon={Code2}
                  label="Frontend"
                  sublabel="Web application"
                />
                <ArrowRight className="mx-auto hidden h-5 w-5 text-primary lg:block" />
                <ArchitectureBox
                  icon={Network}
                  label="API Gateway"
                  sublabel="Secure routing"
                  primary
                />
                <ArrowRight className="mx-auto hidden h-5 w-5 text-primary lg:block" />
                <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                  {[
                    "Auth Service",
                    "Patient Service",
                    "Doctor Service",
                    "Appointment Service",
                    "AI Agent Service",
                    "Realtime Service",
                    "Notification Service",
                  ].map((service) => (
                    <div
                      key={service}
                      className="flex min-h-16 items-center gap-2 rounded-md border border-border bg-section p-3 text-xs font-semibold"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-5 text-xs font-medium text-muted-foreground">
                <LockKeyhole className="h-3.5 w-3.5 text-primary" />
                Encrypted communication across every service
              </div>
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="scroll-mt-16 bg-primary px-5 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/15">
              <Zap className="h-6 w-6" />
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              See HealthOps AI in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/75 sm:text-lg">
              Fully deployed and live — register your hospital in under 2
              minutes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-primary-foreground text-primary shadow-none hover:bg-primary-foreground/90"
              >
                <Link to="/dashboard">
                  Open Live Demo <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-primary-foreground/40 bg-transparent text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#footer">
                  <Github />
                  View GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-20 px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Clear answers"
              title="Frequently asked questions"
            />
            <Accordion
              type="single"
              collapsible
              className="border-t border-border"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer
        id="footer"
        className="border-t border-border bg-section px-5 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Brand />
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              AI-powered hospital operations, built for clearer decisions and
              better patient flow.
            </p>
          </div>
          <div className="md:text-right">
            <div className="flex gap-5 md:justify-end">
              <a
                href="#footer"
                className="text-sm font-semibold text-foreground hover:text-primary"
              >
                GitHub
              </a>
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-foreground hover:text-primary"
              >
                Live Demo
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Built by{" "}
              <span className="font-semibold text-foreground">
                Adarsh — Full Stack AI Developer
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArchitectureBox({
  icon: Icon,
  label,
  sublabel,
  primary = false,
}: {
  icon: ElementType;
  label: string;
  sublabel: string;
  primary?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4",
        primary
          ? "border-primary/30 bg-primary-soft"
          : "border-border bg-section"
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-md",
          primary
            ? "bg-primary text-primary-foreground"
            : "bg-card text-primary"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}
