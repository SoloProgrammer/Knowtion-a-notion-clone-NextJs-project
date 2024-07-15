"use client";

import { PropsWithChildren } from "react";

import EmojiPicker, { Theme } from "emoji-picker-react";

import { useTheme } from "next-themes";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

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
      <PopoverContent
        align="start"
        className="p-0 shadow-none border-none"
      >
        <EmojiPicker
          className="text-sm"
          lazyLoadEmojis
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange?.(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
