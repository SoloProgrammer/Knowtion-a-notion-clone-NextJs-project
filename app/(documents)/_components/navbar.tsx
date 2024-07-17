"use client";

import { SideBarMenu } from "./sidebar/side-bar-menu";
import { Title } from "./title";
import { ArchivedBanner } from "./archived-banner";
import { ArchiveDropDown } from "./archive-dropdown";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Doc } from "@/convex/_generated/dataModel";

import { MoreHorizontal } from "lucide-react";
import { Publish } from "./publish";

type NavbarProps = {
  document: Doc<"documents">;
};

export const Navbar = ({ document }: NavbarProps) => {
  return (
    <>
      <nav className="min-h-14 px-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <SideBarMenu />
          <Title document={document} />
        </div>
        <div className="flex items-center gap-x-2">
          <Publish
            documentId={document._id}
            isPublished={document.isPublished!}
            disabled={document.isArchived}
          />
          <ArchiveDropDown
            documentId={document._id}
            lastEdited={document.updatedAt!}
            side="bottom"
            align="end"
            disabled={document.isArchived}
          >
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4 shrink-0" />
            </Button>
          </ArchiveDropDown>
        </div>
      </nav>
      {document.isArchived && <ArchivedBanner documentId={document._id} />}
    </>
  );
};

Navbar.Skeleton = () => {
  return (
    <nav className="flex w-full border-b px-2 h-14 items-center justify-between">
      <Title.Skeleton />
      <Skeleton className="w-6 h-2 mr-2 rounded-none" />
    </nav>
  );
};
