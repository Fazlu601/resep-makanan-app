import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './page/Home'
import Loading from './components/loader/Loading'
import './App.css'
import axios from 'axios'
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import { AuthSessionContext } from './context/AuthProvider'
import {API_URL} from './api/api'
import CreateRecipe from './page/CreateRecipe'
import ShowRecipe from './page/ShowRecipe'

function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const { setSession} = useContext(AuthSessionContext);
  const navigate = useNavigate();

  useEffect( () => {
      const token = localStorage.getItem('TOKEN');
      if(token){
        const tokenParse = JSON.parse(token);
        axios.get(`${API_URL}user`, {
          headers: {
            'Authorization' : `Bearer ${tokenParse}`
          }
        }).then( res => {
          const data = res.data;
          setSession(data);
          setIsLoading(false);
        } ).catch( err => console.log(err) );
      }else {
        setIsLoading(false);
        navigate('/auth/login');
      }
  }, [] );
  
  return (
      <div className='bg-light'>
        { isLoading ? (
          <Loading/>
        ) : (
          <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/create-recipe' element={<CreateRecipe/>} />
                <Route path='/:id/show-recipe' element={<ShowRecipe/>} />
                <Route path='/auth/login' element={<Login/>} />
                <Route path='/auth/register' element={<Register/>} />
            </Routes>
          </>
        ) }
      </div>
  )
}

export default App
