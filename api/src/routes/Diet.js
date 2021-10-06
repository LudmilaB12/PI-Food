const { Diet } = require("../db");

//precargar la base de datos con las dietas que existen 

//armo un array con todas las dietas de la api

const diets = [
  "Gluten free",
  "Dairy free",
  "Lacto ovo vegetarian",
  "Vegan",
  "Vegetarian",
  "Primal",
  "Paleolithic",
  "Pescatarian",
  "Whole 30",
  "Fodmap friendly"
]


//añadirlas en la db si no están

// const getDietsType = async (req, res, next) => {
//     try {
//         const response = await Diet.findAll();
//         if( response.length < 0){ //si ya están cargadas las dietas enviar eso
//             return res.json(response)
//         } else { //si no están cargadas hay que hacerlo
//             try {
//                 const dietas = await Diet.bulkCreate(diets); //las creo/cargo
//                 return res.json(dietas) //las envio como respuestas
//             } catch { err => next(err)}
//         }
//     } catch {err => next(err)}
// }

module.exports = {
    diets,
    // getDietsType
}