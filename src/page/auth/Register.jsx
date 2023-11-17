import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {API_URL} from '../../api/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AuthSessionContext } from '../../context/AuthProvider';

const MySwal = withReactContent(Swal);

function Register() {
    const {setSession} = useContext(AuthSessionContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const objForm = {
            name,
            email,
            password,
            password_confirmation
        }
        axios.post(`${API_URL}register`, objForm).then( res => {
            const data = res.data;
            if(data) {
                localStorage.setItem('TOKEN', JSON.stringify(data.token));
                setSession(data);
                console.log(data);
                navigate('/');
            }
        } ).catch( err => {
            MySwal.fire({
                title: 'Registrasi gagal!',
                icon: 'warning',
                text: err
            });
        } );
    }

return (
    <main className='container-fluid bg-light py-4' >
    <div className="row">
        <div className="card col-6 mx-auto">
            <div className="card-body p-4">
                <h5 className='fw-bold text-center my-4'>DAFTAR AKUN</h5>
                <form onSubmit={handleRegister}>
                    <div className="form-floating mb-3">
                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" value={name} id="floatingInput" placeholder="Nama Lengkap"/>
                        <label htmlFor="floatingInput">Nama lengkap</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" value={email} id="floatingEmail" placeholder="Alamat Email"/>
                        <label htmlFor="floatingEmail">Alamat Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" value={password} id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={(e) => setPassword_confirmation(e.target.value)} className="form-control" value={password_confirmation} id="floatingPassword_confirmation" placeholder="Konfirmasi Password"/>
                        <label htmlFor="floatingPassword_confirmation">Konfirmasi Password</label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary rounded-pill w-100">Daftar</button>
                        <p className='py-3'>Sudah punya akun?<Link className='ms-1' to='/auth/login'>Login Sekarang</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
  )
}

export default Register