import { definePlugin, userHasRole } from "sanity";

import { documentLayout } from "./document.layout";
import { FieldLockAction } from "./field-lock.action";
import { Input } from "./input.resolver";
import type { AuthorizationFunction } from "./types";

type FieldLockPluginConfig = {
  /**
   * A function that determines whether a user
   * is authorized to unlock documents fields.
   */
  authorized: string | string[] | AuthorizationFunction;
};

function createAuthorizationFunction(
  roles = ["administrator", "developer"],
): AuthorizationFunction {
  return (user) => roles.some((role) => userHasRole(user, role));
}

export const fieldLock = definePlugin<FieldLockPluginConfig | void>(
  (config) => {
    let isAuthorized: AuthorizationFunction;
    switch (true) {
      case typeof config?.authorized === "function":
        isAuthorized = config.authorized;
        break;

      case typeof config?.authorized === "string":
        isAuthorized = createAuthorizationFunction([config.authorized]);
        break;

      case Array.isArray(config?.authorized):
        isAuthorized = createAuthorizationFunction(config.authorized);
        break;

      default:
        isAuthorized = createAuthorizationFunction();
    }

    return {
      name: "field-lock",

      form: {
        components: {
          input: Input,
        },
      },

      document: {
        actions: (prev, { currentUser }) =>
          currentUser && isAuthorized(currentUser)
            ? prev.concat(FieldLockAction)
            : prev,

        components: {
          unstable_layout: documentLayout(isAuthorized),
        },
      },
    };
  },
);
