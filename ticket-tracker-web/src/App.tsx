import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { cn } from "cn";

import HomePage from "./components/pages/home";
import SignInPage from "./components/pages/sign-in";
import SignUpPage from "./components/pages/sign-up";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/sign-in", label: "Sign in" },
];

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col">
        <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span
                className="size-2.5 bg-(--accent-border)"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold tracking-widest uppercase">
                Super Ticket
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-xs font-semibold tracking-widest uppercase transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}

              <Button
                size="sm"
                nativeButton={false}
                render={<Link to="/sign-up" />}
                className="ml-2"
              >
                Sign up
              </Button>
            </nav>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-6 text-xs tracking-widest text-muted-foreground uppercase">
            <span>Super Ticket</span>
            <span>Internal IT &middot; 2026</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
