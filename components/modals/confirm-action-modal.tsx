"use client";

import { PropsWithChildren } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  CONFIRM_MODAL_DESC,
  CONFIRM_MODAL_TITLE,
  CONFIRM_MODAL_BUTTONCOPY,
} from "./constants";

type ConfirmModalProps = {
  onConfirm: () => void;
  title?: string;
  description?: string;
  btnCopy?: string;
};

export const ConfirmModal = ({
  children,
  title = CONFIRM_MODAL_TITLE,
  description = CONFIRM_MODAL_DESC,
  btnCopy = CONFIRM_MODAL_BUTTONCOPY,
  onConfirm,
}: PropsWithChildren<ConfirmModalProps>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()} className="px-4 bg-red-500 text-white hover:bg-red-600">
            {btnCopy}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
