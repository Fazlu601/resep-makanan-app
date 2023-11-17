import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import {API_URL} from '../../api/api';

const MySwal = withReactContent(Swal);

function NavBar() {
    const navigate = useNavigate();
    const logout = () => {
        MySwal.fire({
            title: 'Yakin ingin keluar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#547794',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, keluar!'
        }).then( result => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('TOKEN');
                const tokenParse = JSON.parse(token);
                axios.post(`${API_URL}logout`, null, {
                    headers : {
                        "Authorization" : `Bearer ${tokenParse}`
                    }
                }).then( res => {
                    if(res.data){
                        localStorage.removeItem('TOKEN');
                        MySwal.fire({
                            icon: 'success',
                            title: res.data.message
                        });
                        navigate('/auth/login');
                    }
                } )
            }
        } );
    }

return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Resepku</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to='/' className={(({isActive}) => (isActive ? 'nav-link active' : 'nav-link'))} aria-current="page">Beranda</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/create-recipe' className={(({isActive}) => (isActive ? 'nav-link active' : 'nav-link'))}>Tulis Resep</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink onClick={logout} className={(({isActive}) => (isActive ? 'nav-link active' : 'nav-link'))}>Logout</NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar