"use client";

import Image from "next/image";

import { SideBarMenu } from "../../_components/sidebar/side-bar-menu";
import { BRAND_NAME, PLANS } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Loader, PlusCircle } from "lucide-react";

import { useUser } from "@clerk/clerk-react";
import { useUpgrade } from "@/hooks/zustand/use-upgrade";
import { useSubscription } from "@/hooks/zustand/use-subscription";
import { useTotalDocuments } from "@/hooks/zustand/use-total-documents";
import { useCreateNewDocumentMutation } from "./hooks";

import { cn } from "@/lib/utils";
import { MAX_FILES } from "../../_components/sidebar/constants";

const DocumentsPage = () => {
  const { user } = useUser();
  const { onCreateDocument, isCreating } = useCreateNewDocumentMutation();
  const { totalFiles } = useTotalDocuments();
  const { openUpgrade } = useUpgrade();
  const { plan, isPlanLoading } = useSubscription();

  const CreateNewDocumentIcon = isCreating ? Loader : PlusCircle;

  const handleCreateNewDocument = () => {
    if(!totalFiles || !plan) return;
    if (totalFiles >= MAX_FILES && plan !== PLANS.PRO) {
      openUpgrade();
    } else onCreateDocument({ title: "" });
  };

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
        {isPlanLoading && (
          <Skeleton className="w-[140px] h-[37px] mt-5 rounded-md" />
        )}
        {!isPlanLoading && (
          <Button
            disabled={isCreating || isPlanLoading}
            className="mt-5 disabled:opacity-80"
            size={"sm"}
            onClick={handleCreateNewDocument}
          >
            <span>
              <CreateNewDocumentIcon
                className={cn("w-4 h-4 mr-2", isCreating && "animate-spin")}
              />
            </span>
            <span>
              {isCreating ? "Creating new document.." : "Create a note"}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default DocumentsPage;
