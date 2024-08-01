import { useGetFavoutiteDocumentsQuery } from "../(routes)/documents/hooks";
import { useParams, useRouter } from "next/navigation";

import { Item } from "./item";

import { FileIcon, Star } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const FavouriteDocumentsList = () => {
  const router = useRouter();
  const params = useParams();
  const { data: documents, isLoading } = useGetFavoutiteDocumentsQuery();

  const onRedirect = (documentId: Id<"documents"> | undefined) =>
    router.push(`/documents/${documentId}`);

  if (isLoading) {
    return <Item.Skeleton />;
  }

  return (
    <div className="my-3">
      <h3
        className={cn(
          "px-4 pb-3 text-primary/80 flex items-center gap-x-2 text-sm font-semibold",
          (!documents || documents.length < 1) && "hidden"
        )}
      >
        <Star className="w-4 h-4" /> 
        <span className="truncate">Favourites</span>
      </h3>
      {documents?.map((document) => (
        <div key={document?._id}>
          <Item
            showActions={false}
            icon={FileIcon}
            label={document?.title || "Untitled"}
            onClick={() => onRedirect(document?._id)}
            active={params.documentId === document?._id}
            documentIcon={document?.icon}
            id={document?._id}
          />
        </div>
      ))}
    </div>
  );
};
