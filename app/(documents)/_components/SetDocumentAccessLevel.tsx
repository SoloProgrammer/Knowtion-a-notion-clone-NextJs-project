import React, { useEffect } from 'react'
import { useGetCollaboratorByUserId } from '../(routes)/documents/hooks';
import { Id } from '@/convex/_generated/dataModel';
import { useDocumentAccess } from '@/hooks/zustand/use-document-accessControl';
import { ACCESS_LEVELS } from '@/app/constants';

export const SetDocumentAccessLevel = ({ documentId, userId }: { documentId: Id<"documents">; userId: string}) => {
  const { data: collaborator } = useGetCollaboratorByUserId(documentId, userId)
  const { setAccessControl } = useDocumentAccess()
  useEffect(() => {
    const isCollaboratorHasWriteAccess = collaborator ? collaborator?.access === ACCESS_LEVELS.WRITE : true; // This should be determined based on the collaborator's access level in the application logic
    setAccessControl({ editable: isCollaboratorHasWriteAccess, documentId });
  }, [collaborator, documentId])
  return <></>
}
