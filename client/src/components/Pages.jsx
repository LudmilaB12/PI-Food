import React from "react";

export default function Paginado({recipesPerPage, allRecipes, paginado }) {
    const pageNumber = [];
    
    
    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){ //acá determino la cantidad de paginas que voy a tener en base de la cantidad de recetas que tengo que mostrar
        pageNumber.push(i)
    }
    
    return ( //esto es lo que me renderiza el paginad0
        <nav>
            <ul >
                { pageNumber && pageNumber.map(number => { //si tengo el arreglo mapeame cada uno de los numeros que requiera el paginado
                   return(
                   <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li> )
                })}
            </ul>
        </nav>
    )
}