import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { OnBoardStore, StoreProvider } from './stores/OnBoardStore'
import { ThemeProvider } from '@mui/material/styles'
import { HelmetProvider } from 'react-helmet-async'

import { rootOnboarding, rootAdmin } from './static/Roots'
import HomeOnboarding from './containers/HomeOnboarding'
import HomeAdmin from './containers/HomeAdmin'

import { theme } from './styles/Theme'

const store = new OnBoardStore()

function App() {
  return (
    <div className='App'>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Navigate to={rootAdmin} replace />} />
            <Route default path={`${rootOnboarding}/*`} element={<HomeOnboarding />} />
            <Route path={`${rootAdmin}/*`} element={<HomeAdmin />} />
          </Routes>
          </HelmetProvider>
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
}

export default App