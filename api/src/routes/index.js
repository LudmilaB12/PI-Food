require('dotenv').config();
const { Diet, Recipe } = require("../db");

const { API_KEY } = process.env;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require('sequelize');
const {getApiInfo,
       getDBifno,
       getAllinfo} = require('./models.js');
const { diets } = require('./Diet.js')



const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async(req, res) => {
    const { name } = req.query//si me pasan la palabra la busca por query
    
    if(name){
        try{
        let apiRecipes = await getApiInfo() //me traigo las recetas de la api (faltan las de bases de datos)
            
        let filterDB = await Recipe.findAll({
                where: {
                    name: {
                        [Op.ilike]: `%${name}%`
                    }
                }
                , include: {
                    model: Diet,
                    through:{
                        atributes: ["name","id"],
                    }
                }
             });
            
        let filterRecipe = apiRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) //me traigo todas las recetas dentro de la api que tengan el query
        console.log(filterRecipe)
        res.status(200).send(filterRecipe)
            } catch(err){
                res.status(404).send("Receta no encontrada")
            }
        } else {
        const allRecipes = await getAllinfo()
        res.status(200).send(allRecipes)
        }
});
  
    // let allRecipes = await getApiInfo(); //me guardo el resultado de AllInfo
    // res.status(200).send(allRecipes)
    // try {
    //     if(name){ //si me pasan por query
    //         let recipeName = await axios.get('') //pregunto en allRecipes si se encuentra
    //         console.log(recipeName)
    //         recipeName.length ?  //si hay algo dentro
    //         res.status(200).send(recipeName) : //envia recipeName
    //         res.status(404).send("No se encontraron recetas con esa palabra") //si no un mensaje de error
    //     } else {
    //         res.status(200).send(allRecipes) //si no se pasa nada por query enviar todas las recetas
    //     }} catch(err){
    //         console.log(err)
    //     }
 

router.get('/recipes/:id', async(req, res) =>{ //aún no funciona
    const {id} = id.params;
    try {
        const totalRecipes = await getAllinfo()
        let recipeID = await totalRecipes.filter(el => el.id === id)
        res.status(200).send(recipeID)
    } catch(err){
        res.status(404).send("Receta no encontrada")
        console.log(err)
    }
})

router.get('/types', async(req, res, next) => { //FUNCIONA
        try {

            diets.forEach( el => {
                Diet.findOrCreate({
                    where: {
                        name : el
                    }
                })
            })

            const allDiets = await Diet.findAll();
            console.log(allDiets)
            res.send(allDiets);           
        } catch(err) { console.log(err)}
    });

router.post('/recipe', async (req, res) =>{


})


module.exports = router;
