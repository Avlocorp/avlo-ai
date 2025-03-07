// src/middleware/apiErrorMiddleware.ts
import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config";
import { setUserState } from "services/api/auth";
import storage from "services/storage";

export const apiErrorMiddleware: Middleware = (api) => (next) => (action) => {
  // Check if the action is an RTK Query rejection with a value
  if (isRejectedWithValue(action)) {
    const { status } = action.payload as {
      status: number;
      data?: { message?: string };
    };

    // Handle 401 status
    if (status === 401) {
      // Dispatch setUserState based on the error
      storage.remove(ACCESS_TOKEN_KEY);
      storage.remove(REFRESH_TOKEN_KEY);
      api.dispatch(
        setUserState({
          isAuthenticated: false,
        })
      );
    }
  }

  // Pass the action along the middleware chain
  return next(action);
};
