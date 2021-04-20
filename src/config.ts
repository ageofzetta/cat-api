// eslint-disable
interface BaseConfig {
  enableLogger: boolean;
  mockApis: boolean;
  environment: string;
}
const config: BaseConfig = {
  // @ts-ignore
  mockApis: USE_MOCKED_APIS || false,
  // @ts-ignore
  environment: ENVIRONMENT || "production",
  // @ts-ignore
  enableLogger: ENABLE_MAIN_LOGGER || false,
};

export default config;
