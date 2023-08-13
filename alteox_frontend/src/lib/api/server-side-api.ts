type Headers = {
  'Content-Type': string;
}

type Options = {
  method: string,
  headers: Headers,
}

const request = async ({ method, path }: { method: string, path: string }): Promise<Response> => {
  const options = <Options>{ method, headers: <Headers>{} }
  options.headers['Content-Type'] = 'application/json';
  const baseURL = `${import.meta.env.VITE_SERVER_URL}${path}`
  return await fetch(baseURL, options);
}

export function get({ path }: { path: string }): Promise<Response> {
  return request({ method: 'GET', path });
}

export function put({ path }: { path: string }): Promise<Response> {
  return request({ method: 'PUT', path });
}