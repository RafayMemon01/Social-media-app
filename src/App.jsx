import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import PageLayout from './layouts/PageLayout/PageLayout'

function App() {
  

  return (
    <PageLayout>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>



    </Routes>
    </PageLayout>
  )
}

export default App
