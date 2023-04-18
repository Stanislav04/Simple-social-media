import './App.css'
import { useState } from 'react'
import Auth from './components/auth/auth'
import Posts from './components/posts/posts'

function App() {
  const [currentUser, setCurrentUser] = useState("")

  return (
    <div className="App">
      {
        !currentUser ? <Auth setCurrentUser={setCurrentUser} /> : <Posts currentUser={currentUser} setCurrentUser={setCurrentUser} />
      }
    </div>
  )
}

export default App
