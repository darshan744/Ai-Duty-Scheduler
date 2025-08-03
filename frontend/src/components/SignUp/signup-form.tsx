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
import { useState, type FormEvent } from "react";
import { signUp } from "@/api/auth";
import type { SignUpProps } from "@/api/types";
import { toast } from "sonner";

function isInvalidUser(user: Partial<SignUpProps>): user is SignUpProps {
  return Object.values(user).every((value) => value !== undefined);
}

function SignUpForm({ onLoginClick }: SignUpFormProps) {
  const [signUpUser, setSignUpUser] = useState<SignUpUser | undefined>(
    undefined,
  );
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const user = { ...signUpUser };
    if (!isInvalidUser(user)) {
      return;
    }
    try {
      const response = await signUp(user);
      localStorage.setItem("user", response.toString());
      toast.success("SignUp Success");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
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
                <Label htmlFor="name">Name</Label>
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
                <Label htmlFor="regno">Register Number</Label>
                <Input
                  id="regno"
                  type="text"
                  placeholder="Registration Number"
                  onChange={(event) =>
                    setSignUpUser({ ...signUpUser, regNo: event.target.value })
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
                <Button onClick={handleSignUp} type="submit" className="w-full">
                  Sign Up
                </Button>
                <Button variant="outline" className="w-full">
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button onClick={onLoginClick} variant="link">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default SignUpForm;
