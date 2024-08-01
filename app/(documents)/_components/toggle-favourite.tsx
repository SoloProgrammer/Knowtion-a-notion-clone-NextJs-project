"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  useAddToFavouritesMutation,
  useCheckDocumentIsFavoutiteQuery,
  useRemoveFromFavouritesMutation,
} from "../(routes)/documents/hooks";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Spinner } from "@/components/spinner";

export const ToggleFavorite = ({
  documentId,
  disabled = false,
}: {
  documentId: Id<"documents">;
  disabled?: boolean;
}) => {
  const { data: isFavourite, isLoading } =
    useCheckDocumentIsFavoutiteQuery(documentId);

  const { addToFavourites, isPending: isAdding } = useAddToFavouritesMutation();
  const { removeFromFavourites, isPending: isRemoving } =
    useRemoveFromFavouritesMutation();

  const handleClick = () => {
    if (!isFavourite) {
      addToFavourites({ docId: documentId });
    } else {
      removeFromFavourites({ docId: documentId });
    }
  };

  const loading = isLoading || isAdding || isRemoving;

  return (
    <Button
      size={"sm"}
      onClick={handleClick}
      className="bg-muted/30 p-2 h-8 select-none"
      variant={"ghost"}
      disabled={loading || disabled}
    >
      {loading ? <Spinner /> : isFavourite ? <StarFill /> : <Star />}
    </Button>
  );
};

const Star = () => (
  <div className="w-4 h-4 relative">
    <Image src={"/star.png"} alt="star" fill className="object-cover dark:invert" />
  </div>
);

const StarFill = () => (
  <div className="w-4 h-4 relative">
    <Image src={"/star-fill.png"} alt="star" fill className="object-cover" />
  </div>
);
