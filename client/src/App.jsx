import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Photo from "./photo"

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
     <Photo/>
    </>
  )
}

export default App;
