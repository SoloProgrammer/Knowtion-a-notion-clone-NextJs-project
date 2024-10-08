"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { FileIcon } from "lucide-react";

import { useSearch } from "@/hooks/zustand/use-search";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useParams, useRouter } from "next/navigation";
import { useGetDocumentsQuery } from "@/app/(documents)/(routes)/documents/hooks";

import { BRAND_NAME } from "@/app/constants";

export function SearchCommand() {
  const { isOpen, hideSearch, toggleSearch } = useSearch();
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const { data: documents } = useGetDocumentsQuery();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    hideSearch();
  }, [params]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={hideSearch}>
      <CommandInput placeholder={`Search ${user?.fullName}'s ${BRAND_NAME}`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" className="mb-[.35rem]">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => {
                router.push(`/documents/${document._id}`);
              }}
              className="flex items-center gap-x-1 font-medium"
            >
              <span className="text-muted-foreground">
                {document.icon ? (
                  document.icon
                ) : (
                  <FileIcon className="w-4 h-4" />
                )}
              </span>
              <span>{document.title || "Untitled"}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
