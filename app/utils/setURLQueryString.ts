import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

// 원하는 쿼리 스트링을 주소창 URL에 적용하는 setURLQueryString 함수
const setURLQueryString = (
  router: AppRouterInstance,
  query: string,
  data: string
): void => {
  // 현재 URL의 query string 값
  const params = new URLSearchParams(window.location.search);

  if (params.has(query)) {
    params.set(query, data);
  } else {
    params.append(query, data);
  }

  const newQueryString = params.toString();

  router.push(`/?${newQueryString}`);
  router.refresh();
};

export default setURLQueryString;
