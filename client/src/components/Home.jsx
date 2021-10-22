import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import {getRecipes, getRecipeByType, sortByScore, sortByName } from "../actions";
import {Link} from "react-router-dom";
import CardRecipe from "./CardRecipe";
import Pages from "./Pages";
import SearchBar from "./SearchBar";


export default function Home() {
    const dispatch = useDispatch();
    const [order, setOrder] = useState('') //para renderizar cuando hacemos el orden
    const allRecipes = useSelector((state) => state.recipes); //con el use selector me traigo todo lo que está en el estado que quiero
    const [currentPage, setCurrentPage] = useState(1); //seteo la pagina actual que arranca en 1
    const [recipesPerPage, setRecipesPerPage] = useState(9); //seteo la cantidad de recetas por pagina
    const indexLastRecipe = currentPage * recipesPerPage; //índice de la última receta que se muestra
    const indexFirstRecipe = indexLastRecipe - recipesPerPage; //índice de la primera receta que se muestra
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe) //indico cuales son las recetas a renderizar

    const paginado = (pageNumer) => {
        setCurrentPage(pageNumer)
    };


    useEffect(()=>{
        dispatch(getRecipes()) //despachamos la action 
    }, [dispatch] ) //dentro del array colocar de que depende si lo necesita

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes);
    }

    function handleFilterStatus(e){
        dispatch(getRecipeByType(e.target.value))
    }
    function handleSortName(e){
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleSortScore(e){
        e.preventDefault()
        dispatch(sortByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }
    return (
        <div>
            <Link to="/recipe">Crea tu propia receta</Link>
            <h1>Bienvenidos a la pagina</h1>
            <SearchBar />
            <button onClick={ e => handleClick(e)}>Volver a cargar todas las recetas</button>
            <select onChange={e => handleFilterStatus(e)}>
                <option value="AllDiets">Todas las dietas</option>
                <option value="vegetarian">Vegetariana</option> 
                <option value="vegan">Vegana</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="lacto ovo vegetarian">Lacto Ovo Vegetariano</option>
                <option value="primal">Primal</option>
                <option value="paleolithic">Paleolítica</option>
                <option value="pescatarian">Pecetariana</option>
                <option value="whole 30">Whole 30</option>
                <option value="fodmap friendly">Fodmap friendly</option>
            </select>
            <select onChange={ e => handleSortName(e)}>
                <option value="ascen">A-Z</option>
                <option value="descen">Z-A</option>
            </select>
            <select onChange={ e => handleSortScore(e)}>
                <option value="mayor">Mayor puntuación</option>
                <option value="menor">Menor puntuación</option>
            </select>
            
            <div className="Paginado">
            <Pages 
            recipesPerPage={recipesPerPage} 
            allRecipes={allRecipes.length} 
            paginado={paginado}/>
            </div>
            
            <div>
            {
                
             currentRecipes?.map((e) => {
                    return(
                        <div>
                            <Link to={"/home" + e.id}>
                              <CardRecipe name={e.name} img ={e.img} diet={e.diets} key={e.id} />
                            </Link>
                        </div>
                    );
                })
            }
            </div>

        </div>
    )

}