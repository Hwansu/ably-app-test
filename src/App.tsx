import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import Router from './routes'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
