import { ReactNode } from 'react'

const AuthLayout = ({ children }: {children: ReactNode}) => {
  return <div className='h-screen'>{children}</div>
}

export default AuthLayout