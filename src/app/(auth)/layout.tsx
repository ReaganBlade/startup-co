import React from 'react'

export const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <section>
        Left Image
      </section>
      {children}
    </div>
  )
}