"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getHostUrl } from "@/utils/urls";

const PreviewErrorPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center flex-col gap-y-4 px-3">
      <h1 className="text-4xl md:text-5xl font-semibold text-center md:text-start">
        There is nothing here to preview!
      </h1>
      <small className="text-sm text-muted-foreground">
        The document you are trying to view is not published yet
      </small>
      <Image
        width={300}
        height={300}
        src={"/not-found.png"}
        alt="Not-found"
        className="dark:invert"
      />
      <Link href={getHostUrl()}>
        <Button
          className="h-auto py-1 underline group"
          size="sm"
          variant={"ghost"}
        >
          <span>Visit Knowtion</span>
          <ArrowRight className="w-4 h-4 ml-1 transition group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default PreviewErrorPage;
