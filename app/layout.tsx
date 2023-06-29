import 'app/globals.scss';
import { Metadata } from 'next';
import Header from 'app/components/Header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        {<Header />}
        <div className="container">{children}</div>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: '퀴즈몬',
};

export default RootLayout;
