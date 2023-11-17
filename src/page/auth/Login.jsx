import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSessionContext } from '../../context/AuthProvider'
import {API_URL} from '../../api/api'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

function Login() {
    const {setSession} = useContext(AuthSessionContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const objForm = {
            email, 
            password
        }
        axios.post(`${API_URL}login`, objForm).then( res => {
            const data = res.data;  
            if(data) {
                localStorage.setItem('TOKEN', JSON.stringify(data.token));
                setSession(data)
                navigate('/');
            }
        } ).catch( err => {
            MySwal.fire({
                title: 'Login gagal!',
                icon: 'warning',
                text: err
            });
        } );
    }


return (
    <main className='container-fluid bg-light' >
        <div className="row d-flex align-items-center" style={{ height:'85vh' }}>
            <div className="card col-lg-5 col-md-6 col-sm-10 mx-auto">
                <div className="card-body p-4">
                    <h5 className='fw-bold text-center my-4'>SILAHKAN LOGIN TERLEBIH DAHULU</h5>
                    <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInputLogin" placeholder="Alamat Email"/>
                            <label htmlFor="floatingInputLogin">Alamat Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPasswordLogin" placeholder="Password"/>
                            <label htmlFor="floatingPasswordLogin">Password</label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary rounded-pill w-100">Login</button>
                            <p className='py-3'>Belum punya akun?<Link className='ms-1' to='/auth/register'>Daftar Sekarang</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Login