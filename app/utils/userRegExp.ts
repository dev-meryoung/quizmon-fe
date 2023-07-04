// 유저 정보(아이디, 비밀번호)에 대한 유효성 검사를 실행하는 함수
const userRegExp = (type: string, value: string): boolean => {
  if (type === 'ID') {
    // 아이디 유효성 검사 기준 : 영어 소문자와 숫자를 포함한 4~20자
    const idRegExp: RegExp = /^[a-z\d]{4,20}$/;

    if (idRegExp.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (type === 'PW') {
    // 비밀번호 유효성 검사 기준 : 영어 대/소문자와 숫자, 특수문자를 포함한 4~20자
    const pwRegExp: RegExp = /^[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{4,20}$/;

    if (pwRegExp.test(value)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default userRegExp;
