import type { ComponentType } from "react";
import type { DocumentLayoutProps } from "sanity";

import { FieldLockProvider } from "./FieldLockContext";
import type { AuthorizationFunction } from "./types";

export const documentLayout: (
  isAuthorized: AuthorizationFunction,
) => ComponentType<DocumentLayoutProps> = (isAuthorized) => (props) => (
  <FieldLockProvider {...props} isAuthorized={isAuthorized}>
    {props.renderDefault(props)}
  </FieldLockProvider>
);
