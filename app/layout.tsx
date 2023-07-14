import 'app/globals.scss';
import { Metadata } from 'next';
import ReactQueryProvider from 'app/ReactQueryProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div id="root">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: '퀴즈몬',
};

export default RootLayout;
