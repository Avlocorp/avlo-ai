interface IConfig {
  APP_NAME: string;
  API_ROOT: string;
}

const config: IConfig = {
  APP_NAME: "Avloai",
  API_ROOT: import.meta.env.VITE_ROOT_API || "",
};

export const ACCESS_TOKEN_KEY = "access";
export const REFRESH_TOKEN_KEY = "refresh_toke";

export default config;
