"use client";

import { PropsWithChildren } from "react";

import { Theme } from "emoji-picker-react";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const DynamicEmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => <Skeleton className="w-[330px] h-[340px]" />,
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
  const { resolvedTheme } = useTheme();

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" className="p-0 shadow-none border-none">
        <DynamicEmojiPicker
          className="text-sm"
          lazyLoadEmojis
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange?.(data.emoji)}
          searchDisabled
        />
      </PopoverContent>
    </Popover>
  );
};
