import { LockIcon, UnlockIcon } from "@sanity/icons";
import type { DocumentActionComponent } from "sanity";

import { useFieldLock } from "./FieldLockContext";

export const FieldLockAction: DocumentActionComponent = () => {
  const fieldLock = useFieldLock();

  return {
    icon: fieldLock.isLocked ? UnlockIcon : LockIcon,
    // TODO: make localizable
    label: fieldLock.isLocked ? "Unlock fields" : "Lock fields",
    disabled: !fieldLock.isAuthorized,
    tone: "caution",
    onHandle() {
      if (fieldLock.isAuthorized) {
        fieldLock.isLocked ? fieldLock.unlock() : fieldLock.lock();
      }
    },
  };
};
