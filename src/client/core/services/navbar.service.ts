import type { CMSEndpointConfig } from "./endpoints";

export const NavbarService = (config: CMSEndpointConfig) => {
  fetch(config.navbar, {}).then(res => res.json());
};
