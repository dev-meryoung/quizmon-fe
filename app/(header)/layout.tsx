import 'app/globals.scss';
import { Metadata } from 'next';
import Header from 'app/components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export const metadata: Metadata = {
  title: '퀴즈몬',
};

export default Layout;
