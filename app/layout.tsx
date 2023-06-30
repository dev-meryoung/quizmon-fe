import 'app/globals.scss';
import { Metadata } from 'next';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: '퀴즈몬',
};

export default RootLayout;
