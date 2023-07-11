import apiClient from 'app/utils/apiClient';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

// 특정 페이지의 접근 권한을 확인하기 위한 함수
const checkPageAccess = (router: AppRouterInstance, url: string): void => {
  const jwt = localStorage.getItem('jwt');

  apiClient.authorCheck(jwt).catch((error) => {
    router.push(url);
    return;
  });
};

export default checkPageAccess;
