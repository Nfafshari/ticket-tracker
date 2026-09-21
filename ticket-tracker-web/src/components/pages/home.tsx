import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.png";

const steps = [
  {
    index: "01",
    title: "Capture",
    body: "Every request lands in one queue instead of scattered inboxes and chat threads.",
  },
  {
    index: "02",
    title: "Triage",
    body: "Sort by status and priority so the urgent work surfaces and nothing stalls.",
  },
  {
    index: "03",
    title: "Resolve",
    body: "Close the loop and keep a record of what the fix actually was.",
  },
];

function HomePage() {
  return (
    <div className="w-full">
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <span className="h-px w-8 bg-(--accent-border)" aria-hidden="true" />
            IT service desk
          </p>

          <h1>Super Ticket</h1>

          <p className="max-w-md text-muted-foreground">
            Your key to IT success. Manage and track tickets easily and
            efficiently.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link to="/sign-up" />}
            >
              Get started
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link to="/sign-in" />}
            >
              Sign in
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div
            className="absolute inset-8 bg-(--accent-bg) blur-3xl"
            aria-hidden="true"
          />
          <img
            src={heroImage}
            alt=""
            className="relative w-full max-w-sm select-none"
          />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.index}
              className={
                i > 0
                  ? "border-t border-border px-6 py-10 sm:border-t-0 sm:border-l"
                  : "px-6 py-10"
              }
            >
              <span className="text-xs font-semibold tracking-widest text-(--accent-border) uppercase">
                {step.index}
              </span>
              <h2 className="mt-4">{step.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
