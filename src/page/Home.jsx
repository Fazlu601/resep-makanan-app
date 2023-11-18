import React, { useContext, useEffect, useState } from 'react'
import Loading from '../components/loader/Loading'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import ResepWrapper from '../components/content/ResepWrapper'
import { AuthSessionContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {API_URL} from '../api/api'

function Home() {

  const {session} = useContext(AuthSessionContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect( () => {
    if(session) {
        const token = localStorage.getItem('TOKEN');
        const tokenParse = JSON.parse(token);
        axios.get(`${API_URL}resep-makanan`, {
          headers : {
            'Authorization' : `Bearer ${tokenParse}`
          }
        }).then( res => {
          const data = res.data;
          if(data){
            setItems([...data]);
            setIsLoading(false);
          }
        } ).catch( err => console.log(err) );
        console.log(items);
    }else {
        navigate('/auth/login');
    }
    console.log(session);
  }, [] );

   return (
          <>
            { isLoading ? (
                <Loading/>
              ) : (
                <>
                  <NavBar/>
                    <main className='container'>
                        <h5 className='fw-medium lh-md ms-5 my-3'>Resep Terbaru</h5>
                        <ResepWrapper data={items} />
                    </main>
                  <Footer/>
                </>
              )
            }
          </>
  )
}

export default Home