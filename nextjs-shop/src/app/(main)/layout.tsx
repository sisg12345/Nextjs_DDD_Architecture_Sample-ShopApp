import { SessionProvider } from 'next-auth/react'
import { use, type PropsWithChildren } from 'react'
import RootContainer from '@/components/containers/RootContainer'
import Footer from '@/components/organisms/Footers/Footer'
import Header from '@/components/organisms/Headers/Header'
import { auth } from '@/lib/auth/auth'

export default function Layout({ children }: PropsWithChildren) {
  // セッション
  const session = use(auth())

  return (
    <SessionProvider session={session}>
      <Header />
      <RootContainer>{children}</RootContainer>
      <Footer />
    </SessionProvider>
  )
}
