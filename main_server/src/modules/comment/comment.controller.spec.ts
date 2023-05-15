import { Comment } from './comment.model';
import { CookieJar } from 'tough-cookie';
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
    const result = await fetch('http://localhost:3000/users/signin', {
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
      cookieJar.setCookieSync(cookie, 'http://localhost:3000');
    }

    const resultCsrf = await fetch('http://localhost:3000/secoptions', {
      headers: {
        Cookie: cookieJar.getCookieStringSync('http://localhost:3000'),
      },
    });

    const setCookieHeader2 = resultCsrf.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookie = setCookieHeader2.split(';')[0];
      cookieJar.setCookieSync(cookie, 'http://localhost:3000');
    }

    const data = await result.json();
    expect(data.msg).toBe('User logged in');
  });

  it('create comment', async () => {
    const result = await fetch('http://localhost:3000/comment', {
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
        Cookie: cookieJar.getCookieStringSync('http://localhost:3000'),
      },
    });
    const data = await result.json();
    expect(data.content).toBe('test');
  });

  it('get comments and find one with content test', async () => {
    const result = await fetch(
      'http://localhost:3000/comment?rate=646217e1ed1cba5d909bc886',
      {
        headers: {
          Cookie: cookieJar.getCookieStringSync('http://localhost:3000'),
        },
      },
    );
    const data: Comment[] = await result.json();
    const comment = data.find((comment) => comment.content === 'test');
    globals.comment.id = comment?._id;
    expect(comment.content).toBe('test');
  });

  it('update comment', async () => {
    const result = await fetch(
      `http://localhost:3000/comment?id=${globals.comment.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          content: 'test2',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieJar.getCookieStringSync('http://localhost:3000'),
        },
      },
    );
    const data = await result.json();
    expect(data.content).toBe('test2');
  });

  it('delete comment', async () => {
    const result = await fetch(
      `http://localhost:3000/comment?id=${globals.comment.id}`,
      {
        method: 'DELETE',
        headers: {
          Cookie: cookieJar.getCookieStringSync('http://localhost:3000'),
        },
      },
    );
    const data = await result.json();
    expect(data._id).toBe(globals.comment.id);
  });
});
