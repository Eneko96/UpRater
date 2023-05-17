import { Comment } from './comment.model';
import { CookieJar } from 'tough-cookie';
import { URI } from '@__tests__/mocks'
import fetch from 'node-fetch';
const cookieJar = new CookieJar();

type Global = {
  comment: any;
};

const DEFAULT_GLOBAL: Global = {
  comment: {
    id: '',
  },
};

describe('test find', () => {
  const globals: Global = DEFAULT_GLOBAL;
  beforeEach(async () => {
    const result = await fetch(URI + '/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: 'imoreno@gmail.com',
        password: 'User1234',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const setCookieHeader = result.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookie = setCookieHeader.split(';')[0];
      cookieJar.setCookieSync(cookie, URI);
    }

    const resultCsrf = await fetch(URI + '/secoptions', {
      headers: {
        Cookie: cookieJar.getCookieStringSync(URI + ''),
      },
    });

    const setCookieHeader2 = resultCsrf.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookie = setCookieHeader2.split(';')[0];
      cookieJar.setCookieSync(cookie, URI + '');
    }

    const data = await result.json();
    expect(data.msg).toBe('User logged in');
  });

  it('create comment', async () => {
    const result = await fetch(URI + '/comment', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        content: 'test',
        rate: 5,
        rate_id: '646217e1ed1cba5d909bc886',
      }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieJar.getCookieStringSync(URI + ''),
      },
    });
    const data = await result.json();
    expect(data.content).toBe('test');
  });

  it('get comments and find one with content test', async () => {
    const result = await fetch(URI + '/comment?rate=646217e1ed1cba5d909bc886', {
      headers: {
        Cookie: cookieJar.getCookieStringSync(URI + ''),
      },
    });
    const data: Comment[] = await result.json();
    const comment = data.find((comment) => comment.content === 'test');
    globals.comment.id = comment?._id;
    expect(comment.content).toBe('test');
  });

  it('update comment', async () => {
    const result = await fetch(URI + `/comment?id=${globals.comment.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: 'test2',
      }),
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieJar.getCookieStringSync(URI + ''),
      },
    });
    const data = await result.json();
    expect(data.content).toBe('test2');
  });

  it('delete comment', async () => {
    const result = await fetch(URI + `/comment?id=${globals.comment.id}`, {
      method: 'DELETE',
      headers: {
        Cookie: cookieJar.getCookieStringSync(URI + ''),
      },
    });
    const data = await result.json();
    expect(data._id).toBe(globals.comment.id);
  });
});
