import 'app/globals.scss';
import { Metadata } from 'next';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div id="layout">{children}</div>;
};

export const metadata: Metadata = {
  title: '퀴즈몬 - 퀴즈 생성',
};

export default Layout;
