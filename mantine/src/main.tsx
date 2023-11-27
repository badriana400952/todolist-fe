import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
// Apple Color Emoji", "Segoe UI Emoji";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MantineProvider  theme={{
        fontFamily: 'Verdana, sans-serif',
        fontFamilyMonospace: 'Monaco, Courier, monospace',
        headings: { fontFamily: 'Greycliff CF, sans-serif' },
      }}>
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
  </React.StrictMode>
)
