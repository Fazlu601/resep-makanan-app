import React, { useContext, useEffect, useState } from 'react'
import { API_URL, BASE_URL } from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthSessionContext } from '../../context/AuthProvider';
import axios from 'axios';

function CardRecipe({dataRecipe}) {
    const {session} = useContext(AuthSessionContext);
    const [likeCount, setLikeCount] = useState(dataRecipe.like.length);
    const [like, setLike] = useState(false);

    useEffect( () => {
        const hasLike = dataRecipe.like.some( like => like.user_id === session.id);
        if(hasLike){
            setLike(true);
        }
    }, [like] );

    const handleLike = (recipeID, e) => {
        e.preventDefault();
        setLike(true);
        setLikeCount(likeCount + 1);
        const token = localStorage.getItem('TOKEN');
        const tokenParse = JSON.parse(token);
        const objForm = {
            user_id : session.id,
            resep_makanan_id : recipeID
        }
        console.log(objForm);
        axios.post(`${API_URL}like`, objForm, {
            headers : {
                'Authorization' : `Bearer ${tokenParse}`
            }
        }).then( res => {
            console.log(res);
        } ).catch( err => console.log(err) );
    }

  return (
    <article className='card col-lg-3 col-md-4 col-10 p-0 m-4 shadow-md border-0'>
        <div className="card-header p-0">
            <img className='img-fluid' src={`${BASE_URL}/storage/img-recipe/${dataRecipe.foto}`} alt="" />
        </div>
        <div className="card-body py-3 px-0">
            <small>{likeCount} Orang Menyukai ini</small>
            <Link to={`/${dataRecipe.id}/show-recipe`} className='card-title fw-medium d-block text-primary fs-5' >{dataRecipe.judul}</Link>
            <p className='overflow-ellipsis text-break lh-sm'>{dataRecipe.deskripsi}</p>
            {
                like ? (
                    <button type="button" className='btn btn-primary w-100 rounded-pill' disabled>Sudah Disukai</button>
                ) : (
                <form onSubmit={(e) => handleLike(dataRecipe.id, e)}>
                    <button type="submit" className='btn btn-secondary text-dark fw-medium w-100 rounded-pill'>Suka</button>
                </form>
                )
            }
        </div>
    </article>
  )
}

export default CardRecipe