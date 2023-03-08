import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import router from './router'
import './assets/index.css'
import './polyfills'

// global state
import { StoreContainer } from './store'

// rainbow kit
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import wagmiClient, { Chains } from './wallet'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={Chains} 
        theme={darkTheme({
          accentColor: '#289FEF',
          overlayBlur: 'small',
        })}
        >
        <StoreContainer.Provider>
          <div className='h-screen bg-[image:var(--lines-image)] bg-repeat-y bg-center' style={{height: 'auto', minHeight: '100vh'}}>
            <div className='h-screen bg-[image:var(--gradient-noise-image)] bg-cover pb-10' style={{height: 'auto', minHeight: '100vh'}}>
              <RouterProvider router={router} />
            </div>
          </div>
        </StoreContainer.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
