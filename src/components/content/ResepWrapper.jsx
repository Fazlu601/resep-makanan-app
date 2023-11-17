import React, { useEffect, useState } from 'react'
import CardRecipe from '../card/CardRecipe';

function ResepWrapper({data}) {

  return (
    <section className='row d-flex justify-content-center'>
        {
            data.length > 0 ? (
                data.map( (items, index)=> (
                    <CardRecipe key={index} dataRecipe={items} />
                ) ) 
            ) : (
                <div className='null-container'>
                    <h3 className='text-center'>Tidak Ada Data Resep</h3>
                </div>
            )
        }
    </section>
  )
}

export default ResepWrapper