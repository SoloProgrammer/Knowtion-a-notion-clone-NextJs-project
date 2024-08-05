"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "next-themes";

import data from "@emoji-mart/data";
const DynamicEmojiPicker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => <IconPicker.Skeleton />,
});

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Skeleton } from "./ui/skeleton";

type IconPickerProps = {
  onChange?: (icon: string) => void;
};

export const IconPicker = ({
  children,
  onChange,
}: PropsWithChildren<IconPickerProps>) => {
  const { resolvedTheme: theme } = useTheme();
  const [loadingEmojiPicker, setLoadingEmojiPicker] = useState(true);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.stopPropagation();
    };

    const picker = emojiPickerRef.current;
    if (picker) {
      picker.addEventListener("wheel", handleScroll);
      picker.addEventListener("touchmove", handleScroll);
    }

    return () => {
      if (picker) {
        picker.removeEventListener("wheel", handleScroll);
        picker.removeEventListener("touchmove", handleScroll);
      }
    };
  }, [loadingEmojiPicker]);

  return (
    <Popover onOpenChange={() => setLoadingEmojiPicker(true)}>
      <PopoverTrigger
        asChild
        onClick={() => {
          setTimeout(() => {
            setLoadingEmojiPicker(false);
          }, 0);
        }}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 shadow-none border-none">
        {loadingEmojiPicker ? (
          <IconPicker.Skeleton />
        ) : (
          <div ref={emojiPickerRef}>
            <DynamicEmojiPicker
              lazyLoadEmojis
              height={350}
              theme={theme}
              onEmojiSelect={(data: any) => onChange?.(data.native)}
              data={data}
              autoFocusSearch={false}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

IconPicker.Skeleton = () => <Skeleton className="w-[350px] h-[370px]" />;
