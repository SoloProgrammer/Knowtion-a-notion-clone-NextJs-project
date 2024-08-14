"use client";

import { HTMLAttributes, PropsWithChildren, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { checkout } from "@/actions/transaction.actions";
import { Spinner } from "../spinner";

import ModalProvider from "@/providers/modal-provider";

import Image from "next/image";
import { Sparkles } from "lucide-react";

import { useAuth } from "@clerk/clerk-react";
import { useUpgrade } from "@/hooks/zustand/use-upgrade";

import { BRAND_NAME, PLANS } from "@/app/constants";

export const UpgradePlanModal = ({ children }: PropsWithChildren) => {
  const { isOpen, closeUpgrade } = useUpgrade();
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  return (
    <ModalProvider>
      <Dialog open={isOpen} onOpenChange={closeUpgrade}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0">
          <DialogHeader className="mx-auto pt-4 px-5 !pr-10 text-left">
            <h2 className="text-2xl font-semibold">
              Opps!... looks like you're running out of free access.
            </h2>
            <small className="text-muted-foreground">
              No worries upgrade to pro plan to get unlimited access{" "}
              <Sparkles className="w-3 h-3 shrink-0 text-primary inline" />
            </small>
          </DialogHeader>
          <div className="flex flex-col gap-y-1 items-start w-full">
            <div className="relative h-[300px] w-full -my-8">
              <Image
                fill
                src="/upgrade.png"
                alt="upgrade"
                className="object-contain"
              />
            </div>
            <Separator />
            <div className="p-10 flex flex-col gap-y-1 mx-auto">
              <DialogTitle className="font-semibold text-[26px] md:text-3xl text-center pb-5">
                🚀 Upgrade to Pro at Just $20
              </DialogTitle>
              <ul className="flex flex-col gap-y-2">
                <li className="list-disc ml-5 font-medium">Unlimited files</li>
                <li className="list-disc ml-5 font-medium">Unlimited tools</li>
                <li className="list-disc ml-5 font-medium">
                  Unlimited members
                </li>
                <li className="list-disc ml-5 font-medium">
                  Unlimited workspaces(coming soon..)
                </li>
              </ul>
              <CheckoutButton
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  checkout({
                    amount: 20,
                    buyerId: userId as string,
                    plan: BRAND_NAME + PLANS.PRO,
                  });
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ModalProvider>
  );
};

const CheckoutButton = ({
  isLoading,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { isLoading: boolean }) => {
  return (
    <Button
      {...props}
      disabled={isLoading}
      className="mt-7 font-semibold text-[16px]"
    >
      {!isLoading ? (
        <>
          <span>Upgrade</span>
          <Sparkles className="w-4 h-4 shrink-0 ml-2" />
        </>
      ) : (
        <>
          <span>Redirecting to payment page</span>
          <Spinner className="ml-2"/>
        </>
      )}
    </Button>
  );
};
