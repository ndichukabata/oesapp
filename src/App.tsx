import { useRoutes } from 'react-router'
import { routes } from '@/routes'
import AuthProvider from './api/AuthProvider'
import { useState } from 'react'

const App = () => {
  const routing = useRoutes(routes)

  const token = localStorage.getItem('eostoken')? localStorage.getItem('eostoken'): null;

    const isAuthenticated = !!localStorage.getItem('eostoken');
    
    const [auth, setAuth] = useState(JSON.parse(token ?? '{}'));


  return (
    <AuthProvider value={{ auth: auth,setAuth:setAuth, isAuthenticated: isAuthenticated }}>
      {routing}
    </AuthProvider>
  )
}

export default App
