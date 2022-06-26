import { QueryClient, QueryClientProvider } from 'react-query'
import SubApp from './SubApp'
import React from 'react'

export const queryClient = new QueryClient()

function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <SubApp/>
      </QueryClientProvider>
  )
}

export default App
