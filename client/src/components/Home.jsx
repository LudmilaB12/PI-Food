import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes} from "../actions";
import {Link} from "react-router-dom";
import CardRecipe from "./CardRecipe";
import Pages from "./Pages";


export default function Home() {
    const dispatch = useDispatch();
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
    return (
        <div>
            <Link to="/recipe">Crea tu propia receta</Link>
            <h1>Bienvenidos a la pagina</h1>
            <button onClick={ e => handleClick(e)}>Volver a cargar todas las recetas</button>
            <select>
                <option value="AllDiets">Todas las dietas</option>
                <option value="Vegetarian">Vegetariana</option> 
                <option value="Vegan">Vegana</option>
                <option value="GlutenFree">Gluten Free</option>
                <option value="DairyFree">Dairy Free</option>
                <option value="Lacto">Lacto Ovo Vegetariano</option>
                <option value="Primal">Primal</option>
                <option value="Paleolithic">Paleolítica</option>
                <option value="Pes">Pecetariana</option>
                <option value="Paleo">Paleo</option>
                <option value="Low">Baja en carbohidratos fermentables(FODMAPS)</option>
                <option value="Whole">Whole 30</option>
                <option value="Fodmap">Fodmap friendly</option>
            </select>
            <select>
                <option value="ascen">A-Z</option>
                <option value="descen">Z-A</option>
            </select>
            <select>
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