export type CMSEndpointReference = "site" | "auth" | "navbar" | "graphql";
export type CMSEndpointConfig = Record<CMSEndpointReference, string>;

export type AppEndpointReference = "root" | "core" | "services" | "queries";
export type AppEndpointConfig = Record<AppEndpointReference, string>;

export type EndpointConfig = {
  app: AppEndpointConfig;
  cms: CMSEndpointConfig;
};

export const resolve_cms_endpoints = () => ({
  auth:    import.meta.resolve(`@api/auth/`),
  navbar:  import.meta.resolve(`@api/navbar/`),
  graphql: import.meta.resolve(`@api/graphql`),
  site:    import.meta.resolve(`@site/`),
} as CMSEndpointConfig);

export const resolve_app_endpoints = () => ({
  root: import.meta.resolve("root/"),
  core: import.meta.resolve("@core/"),
  services: import.meta.resolve("@services/"),
  queries: import.meta.resolve("@queries/"),
} as AppEndpointConfig);

export const resolve_endpoints = (): EndpointConfig => ({
  app: resolve_app_endpoints(),
  cms: resolve_cms_endpoints(),
});
