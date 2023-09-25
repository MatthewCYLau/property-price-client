import { ReactNode } from 'react'
import TopNav from '../../components/top-nav'
import Sidebar from '../../components/side-nav'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <Sidebar />
      <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
        <TopNav />
        {props.children}
      </main>
    </div>
  )
}

export default Layout
