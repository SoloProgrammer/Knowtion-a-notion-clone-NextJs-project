"use client";

import { PropsWithChildren } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DialogTrigger } from "@radix-ui/react-dialog";

import ModalProvider from "@/providers/modal-provider";

import Image from "next/image";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useUpgrade } from "@/hooks/zustand/use-upgrade";

export const UpgradePlanModal = ({ children }: PropsWithChildren) => {
  const { isOpen, closeUpgrade } = useUpgrade();
  return (
    <ModalProvider>
      <Dialog open={isOpen} onOpenChange={closeUpgrade}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0">
          <DialogHeader className="mx-auto pt-4 px-5 !pr-10 text-left">
            <h2 className="text-2xl font-semibold">Opps!... looks like you're running out of free access.</h2>
            <small className="text-muted-foreground">No worries upgrade to pro plan to get unlimited access <Sparkles className="w-3 h-3 shrink-0 text-primary inline" /></small>
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
              <Button className="mt-7 font-semibold text-[16px]">
                <span>Upgrade</span>
                <Sparkles className="w-4 h-4 shrink-0 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ModalProvider>
  );
};
