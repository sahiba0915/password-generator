import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "@#$%&*^!"

    for(let i=0 ; i < count ; i++){
      const char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[count, numAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [count, numAllowed, charAllowed])

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    alert("Password Copied 😊")
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-fit max-x-md mx-auto px-4 py-12 my-8 bg-orange-800 shadow-inner rounded-xl'>
        <h1 className='text-center mb-8 text-white text-xl font-semibold'>Generate Your Password</h1>
        <div className='flex flex-row text-center justify-center overflow-hidden'>
        <input 
        type='text' 
        value={password} 
        placeholder='Enter Your Password Here' 
        className='rounded-tl-md rounded-bl-md px-2 py-3 outline-none'
        readOnly
        />
         <button className='bg-blue-800 text-white rounded-tr-md rounded-br-md px-4 py-3 outline-none font-semibold text-sm' onClick={copyPasswordToClipBoard}>Copy</button>
        </div>

        <div className='text-white flex items-center justify-center mt-4 gap-x-4'>
          <div className='flex gap-x-1 items-center'>
            <input 
            type='range'
            min={6}
            max={20}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            />
            <label htmlFor='count' className='text-xs font-semibold'>Length: {count}</label>
          </div>
          <div className='flex gap-x-1 items-center'>
            <input 
            type='checkbox'
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor='count' className='text-xs font-semibold'>Numbers</label>
          </div>
          <div className='flex gap-x-1 items-center'>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='count' className='text-xs font-semibold'>Charaters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
