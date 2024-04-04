import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import TaskProvider from './Context/TaskProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </ChakraProvider>,
)
