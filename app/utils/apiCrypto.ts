import { AxiosHeaderValue } from 'axios';
import crypto from 'crypto';

// API의 요청 헤더에 추가할 인증 정보를 암호화 하는 apiCrypto 함수
const apiCrypto = (method: string, url: string): AxiosHeaderValue => {
  const secretKey: string = `${process.env.NEXT_PUBLIC_API_KEY}`;
  const hmac: crypto.Hmac = crypto.createHmac('sha256', secretKey);
  const time: string = Date.now().toString();

  hmac.update(time);
  hmac.update(method);
  hmac.update(url);

  const requestHeader: AxiosHeaderValue = `${time}:${hmac.digest('base64')}`;

  return requestHeader;
};

export default apiCrypto;
