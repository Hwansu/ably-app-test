import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import Router from './routes'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      // suspense: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* <QueryErrorResetBoundary>
        <Suspense>
        </Suspense>
      </QueryErrorResetBoundary> */}
    </QueryClientProvider>
  )
}

export default App
