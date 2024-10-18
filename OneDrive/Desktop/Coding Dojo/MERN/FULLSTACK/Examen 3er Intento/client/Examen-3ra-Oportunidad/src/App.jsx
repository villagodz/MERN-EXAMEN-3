import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import UserRootLayout from './pages/UserRootLayout'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AppRouteLayout from './pages/AppRouteLayout'
import HomePage from './pages/HomePage'
import AddAlbumPage from './pages/AddAlbumPage'
import EditAlbumPage from './pages/EditAlbumPage'
import AlbumDetailPage from './pages/AlbumDetailPage'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<UserRootLayout />}>
              <Route path='/' element={<Navigate to="login" />}/>
              <Route path='register' element={<RegisterPage />}/>
              <Route path='login' element={<LoginPage />}/>
            </Route>
            <Route path='/app' element={<AppRouteLayout/>}>
              <Route path='/app' element={<Navigate to="/app/home"/>} />
              <Route path='home' element={<HomePage />}/>
              <Route path='addAlbum' element={<AddAlbumPage />}/>
              <Route path='editAlbum/:id' element={<EditAlbumPage />}/>
              <Route path='detailAlbum/:id' element={<AlbumDetailPage />}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
