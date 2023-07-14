'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

// React Query를 사용하기 위한 Provider
const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
