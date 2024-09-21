type FetchArgs = Parameters<typeof fetch>;
export const loader = <T>(transform: (res: Response) => Promise<T>) => (input: FetchArgs[0], init?: FetchArgs[1]) =>
  fetch(input, init).then(res => res.ok ? transform(res) : Promise.reject(res));

export const load_text = loader(res => res.text());
