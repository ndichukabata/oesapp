import { useRoutes } from 'react-router'
import { routes } from '@/routes'
import AuthProvider from './api/AuthProvider'

const App = () => {
  const routing = useRoutes(routes)
  return (
    <AuthProvider value={{ auth: null, isAuthenticated: false }}>
      {routing}
    </AuthProvider>
  )
}

export default App
