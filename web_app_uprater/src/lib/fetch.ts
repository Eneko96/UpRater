import { redirect } from 'react-router-dom';

const CSRF_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
const BASE_URI = 'http://localhost:3000';
const CSRF_URI = '/secoptions';

export const fetchProxy = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<{ res: T; status: number }> => {
  if (CSRF_METHODS.includes(options.method || '')) {
    const csrfResponse = await fetch(BASE_URI + CSRF_URI, {
      method: 'GET',
      credentials: 'include',
    });
    const csrfToken = await csrfResponse.text();

    const response = await fetch(BASE_URI + url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        'x-csrf-token': csrfToken,
      },
    });
    return {
      res: await response.json(),
      status: response.status,
    };
  }
  const response = await fetch(BASE_URI + url, {
    ...options,
    credentials: 'include',
  });
  if (response.status === 401) {
    redirect('/login');
  }
  return {
    res: await response.json(),
    status: response.status,
  };
};
