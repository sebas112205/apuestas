import { Navigate } from 'react-router-dom'

function getToken() {
  return localStorage.getItem('authToken')
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
