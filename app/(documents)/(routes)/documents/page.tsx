"use client";

import Image from "next/image";

import { SideBarMenu } from "../../_components/sidebar/side-bar-menu";
import { BRAND_NAME } from "@/app/constants";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner"

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  
  const onCreateDocument = () =>{
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading:"Creating a new note...",
      success:"Note created!",
      error:"Error happens while crearting a new note!"
    })
  }

  return (
    <div className="flex relative items-start flex-col h-full">
      <SideBarMenu className="absolute top-2 left-2" />
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
          className="mt-5"
          size={"sm"}
          onClick={onCreateDocument}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Create a note
        </Button>
      </div>
    </div>
  );
};
export default DocumentsPage;
