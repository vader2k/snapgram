import { Routes, Route } from 'react-router-dom'

import './App.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages' 
const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public route */}
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-up' element={<SignupForm />} />
        {/* private route */}
        <Route index element={<Home/>} />
      </Routes>
    </main>
  )
}

export default App
