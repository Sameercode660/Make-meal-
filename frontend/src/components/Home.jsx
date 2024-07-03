import React from 'react'
import GoogleAuth from './GoogleAuth'

function Home() {
  return (
    <div>
      <GoogleAuth></GoogleAuth>
    </div>
  )
}

export default React.memo(Home)
