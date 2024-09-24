import type { CMSEndpointConfig } from "./endpoints";

export const AuthService = (config: CMSEndpointConfig) => {
  // TODO: actual diligence
  const get_token = () => temp_token.promise;
  let temp_token = Promise.withResolvers();
  const authenticate = (user: string, password: string) => {
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
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(response => {
        temp_token.resolve(response.entity.token);
        return temp_token.promise;
      });
  };

  const auth = { get_token, authenticate };

  return auth;
};
