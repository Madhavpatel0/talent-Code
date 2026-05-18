import { useState } from 'react'
import { SignIn, SignInButton } from '@clerk/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Welcome to the App</h1>
    <SignInButton />
    </>
  )
}

export default App
