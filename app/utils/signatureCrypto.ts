import { AxiosHeaderValue } from 'axios';
import crypto from 'crypto';

// S3 이미지 업로드를 위한 인증 정보를 암호화 하는 signatureCrypto 함수
const signatureCrypto = (randomString: string): AxiosHeaderValue => {
  const secretKey: string = `${process.env.NEXT_PUBLIC_SIGNATURE_KEY}`;
  const hmac: crypto.Hmac = crypto.createHmac('sha256', secretKey);

  hmac.update(randomString);

  const requestHeader: AxiosHeaderValue = `${hmac.digest('base64')}`;

  return requestHeader;
};

export default signatureCrypto;
