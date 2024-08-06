import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { HTMLAttributes, PropsWithChildren } from "react";

type LoginButtonProps = {
  mode?: "redirect" | "modal" | undefined;
} & HTMLAttributes<HTMLButtonElement>;

export const LoginButton = ({
  mode = "modal",
  className,
  children,
  ...rest
}: PropsWithChildren<LoginButtonProps>) => {
  return (
    <SignInButton mode={mode}>
      <Button {...rest} variant={"default"} size="sm" className={cn("text-xs relative z-10", className)}>
        Get knowtion free
      </Button>
    </SignInButton>
  );
};
