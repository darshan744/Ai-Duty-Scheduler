import { useState } from "react";
import { LoginForm } from "../components/Login/login-form";
import SignUpForm from "@/components/SignUp/signup-form";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    {isLogin ? (
                        <LoginForm onSignUpClick={() => setIsLogin(false)} />
                    ) : (
                        <SignUpForm onLoginClick={() => setIsLogin(true)} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;
