import React from "react";

export default function CardRecipe({img, name, diet}) {
    return (
        <div>
            <img src={img} alt="Image Not Found" width="200px" height="250"/>
            <h3>{name}</h3>
            <h3>{diet}</h3>
        </div>
    )
    
}