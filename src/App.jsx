
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddHabit from './pages/AddHabit'
import MyHabits from './pages/MyHabits'
import EditHabit from './pages/EditHabit'
import Calender from './pages/Calender'
import Statistics from './pages/Statistics'
import Reports from './pages/Reports'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 

  return (
    <>
    <Routes>
<Route path='/' element={<ProtectedRoute>  <Home/> </ProtectedRoute>} />
<Route path='/addhabit' element={ <ProtectedRoute> <AddHabit/> </ProtectedRoute>}/>
<Route path='/myhabits' element={ <ProtectedRoute> <MyHabits/> </ProtectedRoute> }/>
<Route path='/edithabit/:id' element={<ProtectedRoute>  <EditHabit/></ProtectedRoute>}/>
<Route path='/calender' element={<ProtectedRoute> <Calender/></ProtectedRoute> }/>
<Route path='/statistics' element={<ProtectedRoute> <Statistics/></ProtectedRoute> }/>
<Route path='/reports' element={<ProtectedRoute> <Reports/></ProtectedRoute> }/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
