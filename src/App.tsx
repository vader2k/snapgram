import { Routes, Route } from 'react-router-dom'
// pages and component
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages' 
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
// toaster
import { Toaster } from "@/components/ui/toaster"
// css file
import './App.css'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* private route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
