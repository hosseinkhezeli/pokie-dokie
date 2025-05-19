'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { SnackbarProvider } from 'notistack';

interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

export function ProvidersLayout({ children }: Props) {
  return (
    <QueryClientProvider client={client}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          {children}
          <ProgressBar
            height="4px"
            color={'red'}
            options={{ showSpinner: true }}
            shallowRouting
          />
        </SnackbarProvider>
    </QueryClientProvider>
  );
}