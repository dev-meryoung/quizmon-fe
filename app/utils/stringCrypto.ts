import crypto from 'crypto';

// 특정 String 값을 암호화 하는 stringCrypto 함수
const stringCrypto = (data: string | boolean): string => {
  const cryptoData = crypto
    .createHash('md5')
    .update(String(data))
    .digest('hex');
  return cryptoData;
};

export default stringCrypto;
