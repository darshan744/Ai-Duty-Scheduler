import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginFormProps, LoginUser } from "./types";
import { useState, type FormEvent } from "react";
import { login } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function LoginForm({
  className,
  onSignUpClick,
  ...props
}: LoginFormProps) {
  const [loginUser, setLoginUser] = useState<LoginUser>({} as LoginUser);
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userCredentials = { ...loginUser };
    try {
      const user = await login(userCredentials);
      localStorage.setItem("user", user.toString());
      navigate("/staff/profile");
      toast.success("Login Successfull");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Unknown Error");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleLogin} type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button onClick={onSignUpClick} variant="link">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
