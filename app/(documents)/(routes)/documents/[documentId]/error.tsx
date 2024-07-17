"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <Image
        width={300}
        height={300}
        className="object-cover invert-0 dark:invert"
        src={"/error.png"}
        alt="error"
      />
      <h3 className="text-center text-2xl font-bold">Somthing went wrong</h3>
      <Link href={"/documents"} className="mt-5">
        <Button size={"sm"}>
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Go back
        </Button>
      </Link>
    </div>
  );
};

export default Error;
