import './globals.css'
import { StateWrapper } from './context/state'

export const metadata = {
  title: 'Bruinen Starter App',
  description: 'Sample Next application to get you started with the Bruinen API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StateWrapper>
          {children}
        </StateWrapper>
      </body>
    </html>
  )
}
