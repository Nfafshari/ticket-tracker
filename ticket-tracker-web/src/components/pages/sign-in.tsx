import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Welcome back. Enter your details to reach your queue.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
                  >
                    Forgot?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-border">
            <p className="w-full text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignInPage;
