import { useState } from 'react'
import UserRoutes from './Router/User.routes'

function App() {
  const [count, setCount] = useState(0)

  return (
  <UserRoutes/>
  )
}

export default App
