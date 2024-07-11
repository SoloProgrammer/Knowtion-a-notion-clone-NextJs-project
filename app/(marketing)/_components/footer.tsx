import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="py-4 px-3 flex items-center flex-col">
      <div className="w-full flex items-center">
        <Logo />
        <div className="w-full flex justify-between md:justify-end text-muted-foreground items-center gap-x-2">
          <Button variant="ghost" size={"sm"}>
            Privacy Policy
          </Button>
          <Button variant="ghost" size={"sm"}>
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
};
