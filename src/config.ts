interface IConfig {
  API_ROOT: string;
}

const config: IConfig = {
  API_ROOT: import.meta.env.BASE_URL || "",
};

export default config;
