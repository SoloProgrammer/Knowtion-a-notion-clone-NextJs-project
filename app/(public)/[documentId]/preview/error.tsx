"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getHostUrl } from "@/utils/urls";
import { Logo } from "@/app/(marketing)/_components/logo";

const PreviewErrorPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center flex-col gap-y-4 px-3">
      <Logo hideBrandName className="fixed z-10 bottom-5 right-5 !inline-flex" />
      <h1 className="text-4xl md:text-5xl font-semibold text-center">
        There is nothing here to preview!
      </h1>
      <small className="text-sm text-muted-foreground text-center">
        The document you are trying to view is&nbsp;not&nbsp;published&nbsp;yet
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
