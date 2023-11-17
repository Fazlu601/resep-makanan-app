import React, { useContext, useState } from 'react'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import axios from 'axios';
import {API_URL} from '../api/api';
import { AuthSessionContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../components/input/InputComponent';

const MySwal = withReactContent(Swal);

function CreateRecipe() {
    const {session} = useContext(AuthSessionContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [pict, setPict] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [step, setStep] = useState([]);

    const handleCreateRecipe = e => {
        e.preventDefault();
        
        const userID = session.id;
        const newRecipe = recipe.map( items => {
            return {
                nama_bahan : items
            }
        } );
        const newStep = step.map( items => {
            return {
                langkah : items
            }
        } );
        console.log(newRecipe, newStep);
        const formData = new FormData();
        formData.append('user_id', userID);
        formData.append('judul', title);
        formData.append('deskripsi', desc);
        formData.append('bahan', JSON.stringify(newRecipe));
        formData.append('langkah', JSON.stringify(newStep));
        formData.append('foto', pict);

        const token = localStorage.getItem('TOKEN');
        const tokenParse = JSON.parse(token);
        axios.post(`${API_URL}resep-makanan`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${tokenParse}`,
            }
        }).then( res => {
            const data = res.data;
            if(data) {
                MySwal.fire({
                    title: data.message,
                    icon: 'success',
                });
                navigate('/');
            }
        } ).catch( err => {
            console.log(err);
        } );
    }

  return (
    <>
        <NavBar/>
        <main className='container py-4'>
            <div className="row col-lg-8 col-md-10 mx-auto">
                <form onSubmit={handleCreateRecipe}>
                    <h5 className='text-primary'>Tulis Resepmu...</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Judul</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Deskripsi</label>
                        <textarea cols='3' onChange={(e) => setDesc(e.target.value)} rows='3' id="title" className="form-control" >
                        </textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="">Bahan - Bahan</label>
                        <InputComponent labelButton='Item Bahan' setState={setRecipe} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="">Langkah Pembuatan</label>
                        <InputComponent labelButton='Item Langkah' setState={setStep} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="foto">Upload Foto Masakan</label>
                        <input type="file"  onChange={(e) => setPict(e.target.files[0])} id="foto" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary w-100">Terbitkan Resep</button>
                    </div>
                </form>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default CreateRecipe