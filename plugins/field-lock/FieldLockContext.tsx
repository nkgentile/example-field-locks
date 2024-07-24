import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  type DocumentLayoutProps,
  getPublishedId,
  useCurrentUser,
  useEditState,
} from "sanity";

import type { AuthorizationFunction } from "./types";

type FieldLockContextValue =
  | {
      isAuthorized: true;
      isLocked: boolean;
      lock: () => void;
      unlock: () => void;
    }
  | { isAuthorized: false; isLocked: boolean };

const FieldLockContext = createContext<FieldLockContextValue | null>(null);

type FieldLockProviderProps = PropsWithChildren<
  {
    isAuthorized: AuthorizationFunction;
  } & DocumentLayoutProps
>;

export function FieldLockProvider(props: FieldLockProviderProps) {
  const { children, isAuthorized, documentId, documentType } = props;
  const user = useCurrentUser();
  const { published, ready } = useEditState(
    getPublishedId(documentId),
    documentType,
  );
  const isPublished = !(ready && published == null);
  const [isLocked, setIsLocked] = useState(isPublished);
  const isUserAuthorized = useMemo(
    () => user && isAuthorized(user),
    [isAuthorized, user],
  );

  const value = useMemo<FieldLockContextValue>(
    () =>
      isUserAuthorized
        ? {
            isAuthorized: true,
            isLocked,
            lock: () => setIsLocked(true),
            unlock: () => setIsLocked(false),
          }
        : { isAuthorized: false, isLocked: isPublished },
    [isLocked, isPublished, isUserAuthorized],
  );

  return (
    <FieldLockContext.Provider value={value}>
      {children}
    </FieldLockContext.Provider>
  );
}

export function useFieldLock() {
  const context = useContext(FieldLockContext);

  if (!context) {
    throw new Error("useFieldLock must be used within a FieldLockProvider");
  }

  return context;
}
