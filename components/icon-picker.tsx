"use client";

import { PropsWithChildren } from "react";

import dynamic from "next/dynamic";
import { Theme } from "emoji-picker-react";

import { useState } from "react";
import { useTheme } from "next-themes";

const DynamicEmojiPicker = dynamic(() => import("emoji-picker-react"), {
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
  const { resolvedTheme } = useTheme();
  const [loadingEmojiPicker, setLoadingEmojiPicker] = useState(true);

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

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
          <DynamicEmojiPicker
            className="text-sm"
            lazyLoadEmojis
            height={350}
            theme={theme}
            onEmojiClick={(data) => onChange?.(data.emoji)}
            autoFocusSearch={false}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

IconPicker.Skeleton = () => <Skeleton className="w-[345px] h-[345px]" />;
