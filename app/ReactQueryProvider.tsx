'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// React Query를 사용하기 위한 Provider
const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
