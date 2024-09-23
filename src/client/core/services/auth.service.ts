import type { CMSEndpointConfig } from "./endpoints";

export const AuthService = (config: CMSEndpointConfig) => {

  const get_token = (user: string, password: string) => {
    const headers = [
      ["Content-Type", "application/json"],
    ];

    const payload = {
      user,
      password,
      expirationDays: 1
    };

    const request: RequestInit = {
      mode: "cors",
      method: "POST",
      headers: Object.fromEntries(headers),
      body: JSON.stringify(payload),
    };

    return fetch(config.auth, request)
      .then(res => res.ok ? res.json() : Promise.reject(res));
  };

  const auth = { get_token };

  return auth;
};
