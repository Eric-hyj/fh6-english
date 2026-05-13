'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@/context/AuthContext'

const GOOGLE_CLIENT_ID = '739067116223-ubrj0c7jtbuvmhdjs3hrrtpeskcvpv3a.apps.googleusercontent.com'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  )
}
