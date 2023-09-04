// 랜덤한 문자열 6자리를 만들어내는 randomString 함수
export const randomString = (): string => {
  let str = '';

  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 36).toString(36);
  }

  return str;
};
