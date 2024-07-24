"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";

export const PreviewTabs = ({
  setIsPreview,
}: {
  setIsPreview: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Tabs
      defaultValue="account"
      className="w-auto !fixed bottom-6 right-6 z-10"
    >
      <TabsList>
        <TabsTrigger
          value="account"
          className="min-w-[90px]"
          onClick={() => setIsPreview(false)}
        >
          Editor
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="min-w-[90px]"
          onClick={() => setIsPreview(true)}
        >
          Preview
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
