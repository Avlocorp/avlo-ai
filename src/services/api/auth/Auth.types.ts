// Login - POST
export interface LoginResponse {
  data: AuthData;
  email: string | undefined;
  type_user: string | undefined;
}

export interface AuthData {
  accessToken: AccessToken | undefined;
  plainTextToken: string | undefined;
}

export interface AccessToken {
  name: string;
  abilities: string[];
  expires_at: null;
  tokenable_id: number;
  tokenable_type: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export type LoginFormFields = {
  username: string;
  password: string;
  device_token: string;
  type_user: "admin" | "email";
};

// Find by token - GET
export interface TGetMeResponse {
  user: User;
}

export interface User {
  id: number;
  type_user: string;
  name: string;
  email: string;
  additional_info: unknown;
  google_id: unknown;
  email_verified_at: unknown;
  is_active: number;
  created_at: string;
  updated_at: string;
  star: number;
  heart: number;
  deleted_at: unknown;
  fullUrlMedia: unknown;
}
