import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import type { SignUpFormProps, SignUpUser } from "./types";
import { Button } from "../ui/button";
import { useState } from "react";

function SignUpForm({ onLoginClick }: SignUpFormProps) {
  const [signUpUser, setSignUpUser] = useState<SignUpUser>({} as SignUpUser);
  const handleSignUp = () => {};
  return (
    <>
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter Details to Sign Up</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, name: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="regno">Email</Label>
                <Input
                  id="regno"
                  type="text"
                  placeholder="Registration Number"
                  onChange={(event) =>
                    setSignUpUser({ ...signUpUser, regno: event.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(event) =>
                    setSignUpUser({ ...signUpUser, email: event.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={(event) =>
                    setSignUpUser({
                      ...signUpUser,
                      password: event.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button onClick={onLoginClick} variant="link">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default SignUpForm;
