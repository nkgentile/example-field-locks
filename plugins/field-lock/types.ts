import type { CurrentUser } from "sanity";

export type AuthorizationFunction = (user: CurrentUser) => boolean;

declare module "sanity" {
  export interface BaseSchemaDefinition {
    // locked?: ConditionalProperty
    locked?: boolean;
  }

  export interface BaseSchemaType {
    locked?: boolean;
  }
}
