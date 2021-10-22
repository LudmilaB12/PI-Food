import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipes} from "../actions/index";

//importar las actions

export function CreateRecipe(){
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)

    const [input, setInput] = useState({
        name: "",
        resume: "",
        score: "",
        healtyscore: "",
        steps: "",
        img: "",
        diets: [],
        type: []
    })
    
    useEffect(()=>{
        dispatch(getDiets())
    }, [])

    return(
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu receta</h1>
            <form>
                <div>
                    <label>Título de la receta:</label>
                    <input type="text" value={input.name} name="name"></input>
                </div>
                <div>
                    <label>Resumen del plato:</label>
                    <input type="text" value={input.resume} name="resume"/>
                </div>
                <div>
                    <label>Puntuación:</label>
                    <input type="number" value={input.score} name="score"/>
                </div>
                 <div>
                    <label>Nivel de Saludable:</label>
                    <input type="number" value={input.healtyscore} name="healtyscore"/>
                </div>
                <div>
                    <label>Pasos a seguir:</label>
                    <input type="text" value={input.steps} name="steps"/>
                </div>
                <div>
                    <label>Url de la imagen:</label>
                    <input type="text" value={input.img} name="img"/>
                </div>
                <div>
                    <label>Tipo de plato:</label>
                    <input type="number" value={input.healtyscore} name="healtyscore"/>
                </div>
            </form>
        </div>
    )

}
