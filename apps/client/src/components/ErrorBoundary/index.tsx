import { isAxiosError } from "axios";
import Image from "next/image";
import { Component, ErrorInfo, ReactNode } from "react";
import Layout from "../Layout";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error } = this.state;

    if (hasError) {
      if (isAxiosError(error)) {
        return (
          <Layout title={error.message}>
            <Image
              src={`https://http.cat/${error.response?.status}`}
              alt="gatin"
              width={750}
              height={600}
            />
          </Layout>
        );
      }

      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
