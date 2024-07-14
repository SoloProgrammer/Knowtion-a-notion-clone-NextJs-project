"use client";

import { PropsWithChildren } from "react";

import ModalProvider from "@/providers/modal-provider";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../mode-toggle";

import { DialogTrigger } from "@radix-ui/react-dialog";

import { BRAND_NAME } from "@/app/constants";

export const SettingsModal = (props: PropsWithChildren) => {
  return (
    <ModalProvider>
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h3 className="text-lg font-medium">My settings</h3>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-1 items-start">
              <h4>Appearence</h4>
              <span className="text-[.8rem] text-muted-foreground">
                Customize how {BRAND_NAME} looks on your device
              </span>
            </div>
            <ModeToggle />
          </div>
        </DialogContent>
      </Dialog>
    </ModalProvider>
  );
};
