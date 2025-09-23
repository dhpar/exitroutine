"use client"
import { PropsWithChildren, createContext, useReducer, use, Dispatch, ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { dateReducer, initialState } from './reducers';
import { IDateState, IDateAction } from "./reducers.types";
import { SessionProvider } from 'next-auth/react';

export const DatesStateContext = createContext<{
  state: IDateState;
  dispatch: Dispatch<IDateAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const useDates = () => use(DatesStateContext);

export default function Providers({ children }: PropsWithChildren):ReactNode | Promise<ReactNode> {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  });
  const [ state, dispatch ] = useReducer(dateReducer, initialState);

  return <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <DatesStateContext value={{state, dispatch}}>
        {children}
        <ReactQueryDevtools />
      </DatesStateContext>
    </SessionProvider>
  </QueryClientProvider>
};
