import type { ComponentProps } from "react";

export type LoginFormProps = {
  onSignUpClick: () => void;
} & ComponentProps<"div">;

export type LoginUser = {
  email: string;
  password: string;
};
