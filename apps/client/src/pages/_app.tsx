import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/auth";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider returnTo="/login">
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
