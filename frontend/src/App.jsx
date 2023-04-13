import { useState } from 'react'
import './App.css'

import Logo from './components/template/Logo';
import Nav from './components/template/Nav';
import Main from './components/template/Main';
import Footer from './components/template/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Logo />
      <Nav />
      <Main />
      <Footer />
    </div>
  )
}

export default App
