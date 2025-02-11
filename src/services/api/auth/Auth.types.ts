// Login - POST
export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegistrResponseSuccess {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
export interface RegistrResponse {
  massage: string;
}

export type LoginFormFields = {
  username: string;
  password: string;
};

export interface LoginResponseSuccess {
  access: string;
  refresh: string;
}

export type ResponseError = {
  error: string;
  error_description: string;
};
