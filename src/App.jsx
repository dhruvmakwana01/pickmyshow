import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'
import Events from './components/Events.jsx'

function App() {
  
  const [activepage, setActivepage] = useState('default');


  return (
    <>
      <Navbar onLinkclick={setActivepage} />
      <Main currentPage={activepage} />
      <Footer />
    </>
  )
}

export default App
