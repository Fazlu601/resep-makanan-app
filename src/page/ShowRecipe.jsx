import React, { useEffect, useState } from 'react'
import Loading from '../components/loader/Loading';
import axios from 'axios';
import { API_URL, BASE_URL } from '../api/api';
import { NavLink, useParams } from 'react-router-dom';
import NavBar from '../components/header/NavBar';
import Footer from '../components/footer/Footer';

function ShowRecipe() {
    const [isLoading, setIsLoading] = useState(true);
    const [item, setItem] = useState({});
    const {id} = useParams();

    useEffect( () => {
        const token = localStorage.getItem('TOKEN');
        const tokenParse = JSON.parse(token);
        axios.get(`${API_URL}resep-makanan/${id}/show`, {
            headers : {
                'Authorization' : `Bearer ${tokenParse}`
            }
        }).then( res => {
            const data = res.data;
            if(data){
                console.log(data);
                setItem(data);
                setIsLoading(false);
            }
        } ).catch( err => console.log(err) );
    },[] );

  return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                <NavBar/>
                <main className='container py-4'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page">
                            <NavLink to='/'>Beranda</NavLink>
                        </li>
                        <li className="breadcrumb-item active">Lihat Resep</li>
                    </ol>
                </nav>
                    <article className="col-sm-12 col-md-10 col-lg-8 mx-auto p-3">
                        <div className="row mb-3 w-100">
                            <img src={`${BASE_URL}/storage/img-recipe/${item.foto}`} alt={item.judul} className="img-fluid" />
                        </div>
                        <div className="row mb-3">
                            <h2>{item.judul}</h2>
                            <p>{item.deskripsi}</p>
                        </div>
                        <div className="row mb-3">
                            <h3>Bahan - Bahan</h3>
                            <ul className='ms-3 ms-md-4'>
                                { item.bahan_pembuatan.map( (items, index) => (
                                    <div key={index}>
                                        <li className='lh-lg'>{items.nama_bahan}</li>
                                    </div>
                                ) ) }
                            </ul>
                        </div>
                        <div className="row mb-3">
                            <h3>Langkah Pembuatan</h3>
                            <ol className='ms-3 ms-md-4'>
                                { item.langkah_pembuatan.map( (items, index) => (
                                    <div key={index}>
                                        <li className='lh-lg'>{items.langkah}</li>
                                    </div>
                                ) ) }
                            </ol>
                        </div>
                    </article>
                </main>
                <Footer/>
                </>
            )}
        </>
  )
}

export default ShowRecipe