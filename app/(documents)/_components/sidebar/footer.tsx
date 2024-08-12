"use client";

import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { MAX_FILES } from "./constants";
import { BRAND_NAME, PLANS } from "@/app/constants";

import { cn } from "@/lib/utils";

import { useGetTotalDocumentsCount } from "../../(routes)/documents/hooks";
import { useEffect } from "react";
import { useTotalDocuments } from "@/hooks/zustand/use-total-documents";
import { useSubscription } from "@/hooks/zustand/use-subscription";

const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});

export const Footer = () => {
  const { plan } = useSubscription();
  const { update } = useTotalDocuments();
  const {
    data: totalFiles,
    isLoading,
    isSuccess,
  } = useGetTotalDocumentsCount();

  useEffect(() => {
    update(totalFiles || 0);
  }, [isSuccess, totalFiles]);

  return (
    <>
      {plan !== PLANS.PRO && (
        <div className="px-2 pb-1 pt-3 border-t">
          {isLoading ? (
            <Skeleton className="w-full h-3 rounded-full" />
          ) : (
            <Progress
              value={
                totalFiles ? Math.round((totalFiles / MAX_FILES) * 100) : 0
              }
            />
          )}
          <small className="mt-2 truncate inline-block">
            <strong>{totalFiles}</strong>{" "}
            <span className="text-muted-foreground">
              {(totalFiles || 0) > 1 ? "Files" : "File"} created out of&nbsp;
            </span>
            <strong>{MAX_FILES}</strong>
          </small>
        </div>
      )}
      <Link href={"/"}>
        <div className="px-3 hover:bg-primary/5 transition cursor-pointer h-[50px] flex items-center justify-between group">
          <div className="flex items-center gap-x-2">
            <div className="w-6 h-6 relative truncate">
              <Image
                src={"/logo.png"}
                fill
                alt="logo"
                className="object-cover dark:invert"
              />
            </div>
            <span
              className={cn(
                font.className,
                "text-muted-foreground font-semibold truncate group-hover:text-primary"
              )}
            >
              {BRAND_NAME}
            </span>
          </div>
          <div
            className={cn(
              "text-[12px] border border-primary/30 px-2 rounded-md bg-muted-foreground/10",
              plan === PLANS.PRO &&
                "dark:text-yellow-500 bg-yellow-700/10 border-yellow-600 text-yellow-600"
            )}
          >
            {plan}
          </div>
        </div>
      </Link>
    </>
  );
};
