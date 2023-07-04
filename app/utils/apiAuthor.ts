import crypto from 'crypto';

const apiAuthor = (method: string, url: string): { Authentication: string } => {
  const secretKey: string = `${process.env.NEXT_PUBLIC_API_KEY}`;
  const hmac: crypto.Hmac = crypto.createHmac('sha256', secretKey);
  const time: string = Date.now().toString();

  hmac.update(time);
  hmac.update(method);
  hmac.update(url);

  const requestHeader = {
    Authentication: `${time}:${hmac.digest('base64')}`,
  };

  return requestHeader;
};

export default apiAuthor;
