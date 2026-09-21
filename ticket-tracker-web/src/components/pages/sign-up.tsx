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

function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Create an account to start tracking tickets.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">
                  At least 8 characters, with a number and a symbol.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-border">
            <p className="w-full text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;
