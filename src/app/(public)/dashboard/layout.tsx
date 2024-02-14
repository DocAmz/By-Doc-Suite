import { ReactNode } from 'react'

const DashboardLayout = ({ children }: {children: ReactNode}) => {
  return <div className='h-screen w-screen overflow-hidden'>{children}</div>
}

export default DashboardLayout