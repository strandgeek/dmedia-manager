import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../api/queryClient";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)
