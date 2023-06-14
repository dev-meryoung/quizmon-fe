export const metadata = {
  title: '테스트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>레이아웃</h1>
        {children}
      </body>
    </html>
  );
}
