import { Collaborator } from "@/app/(documents)/(routes)/documents/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";

type Size = "default" | "xs" | "sm" | "lg" | "xl";

export const CollaboratorsAvatarStack = ({
  collaborators,
  size = "default",
}: {
  collaborators: Collaborator[];
  size?: Size;
}) => {

  const sizes: Record<Size, string> = {
    default: "w-8 h-8",
    xs: "w-5 h-5",
    sm: "w-6 h-6",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  return collaborators?.map((collaborator) => {
    return (
      <Tooltip key={collaborator.id}>
        <TooltipTrigger>
          <Avatar
            className={`${sizes[size]} rounded-full`}
            style={{
              boxShadow: `0 0 0 2px ${collaborator.color}`,
            }}
          >
            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="!text-xs !p-1 !px-2">
          {collaborator.name}
        </TooltipContent>
      </Tooltip>
    );
  });
};
