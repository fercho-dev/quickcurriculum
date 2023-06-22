import './globals.css'
import { Inter } from 'next/font/google'
import { UserDataProvider } from './UserDataContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quick Curriculum',
  description: 'Genera un curriculum en segundos con ChatGPT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </body>
    </html>
  )
}
