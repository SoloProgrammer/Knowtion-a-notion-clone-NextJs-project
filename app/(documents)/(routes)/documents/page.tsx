"use client";

import Image from "next/image";

import { SideBarMenu } from "../../_components/sidebar/side-bar-menu";
import { BRAND_NAME } from "@/app/constants";
import { Button } from "@/components/ui/button";

import { Loader, PlusCircle } from "lucide-react";

import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useCreateNewDocumentMutation } from "./hooks";

const DocumentsPage = () => {
  const { user } = useUser();
  const { onCreateDocument, isCreating } = useCreateNewDocumentMutation();

  const CreateNewDocumentIcon = isCreating ? Loader : PlusCircle;

  return (
    <div className="flex relative items-start flex-col h-full">
      <SideBarMenu className="absolute top-3 left-3" />
      <div className="flex-grow w-full flex items-center justify-center flex-col">
        <div className="relative w-[350px] h-[350px]">
          <Image
            fill
            src={"/document-welcome.png"}
            className="dark:invert object-contain"
            alt="documents-welcome"
          />
        </div>
        <p className="font-semibold">
          Welcome to {user?.firstName}&apos;s {BRAND_NAME}
        </p>
        <Button
          disabled={isCreating}
          className="mt-5 disabled:opacity-80"
          size={"sm"}
          onClick={() => onCreateDocument({ title: "Untitled" })}
        >
          <span>
            <CreateNewDocumentIcon
              className={cn("w-4 h-4 mr-2", isCreating && "animate-spin")}
            />
          </span>
          <span>{isCreating ? "Creating new document.." : "Create a note"}</span>
        </Button>
      </div>
    </div>
  );
};
export default DocumentsPage;
