import './globals.css'
import { Inter } from 'next/font/google'
import { UserDataProvider } from './UserDataContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quick Curriculum',
  description: 'Genera un curriculum en segundos con ChatGPT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`}></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());

          gtag('config', ${process.env.GTAG_ID});
        `}
      </Script>
      <body id="root" className={inter.className}>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </body>
    </html>
  )
}
