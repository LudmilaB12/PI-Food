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
            const allRecipes = await getAllinfo()
            let filterName = await allRecipes.filter( el => el.name.toLowerCase().includes(name.toLowerCase())) //me traigo toda la info y la filtro
            console.log(filterName)
            res.status(200).send(filterName)
          
        // let apiRecipes = await getApiInfo() //me traigo las recetas de la api (faltan las de bases de datos)
        
        // let filterDB = await Recipe.findAll({
        //         where: {
        //             name: {
        //                 name: name
        //             }
        //         }
        //         , include: {
        //             model: Diet,
        //             through:{
        //                 atributes: ["name","id"],
        //             }
        //         }
        //      });

        // console.log(filterDB)  
        // let filterRecipe = apiRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) //me traigo todas las recetas dentro de la api que tengan el query
        // res.status(200).send(filterRecipe)
        //     } catch(err){
        //         res.status(404).send("Receta no encontrada")
        //     }



        }catch(err){
            res.status(404).send("No se pudo encontrar recetas")
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
    const {id} = req.params;
    if(id){
        try {
            const totalRecipes = await getAllinfo()
            let recipeID = await totalRecipes.filter(el => el.id == id)
            console.log(recipeID)
            recipeID.length ?
            res.status(200).json(recipeID) :
            res.status(404).send("Receta no encontrada")
        } catch(err){
            console.log(err)
        }
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

router.post('/recipe', async (req, res) =>{ //FUNCIONA
    let { name,
        resume,
        score,
        healtyscore,
        steps,
        img,
        diets,
        type
    } = req.body

    if(!name || !resume ){
        res.status(400).send("Falta ingresar el nombre o el resumen")
    }
    try{
       let createRecipe = await Recipe.create({
           name,
           resume,
           score: score || 0,
           healtyscore: healtyscore || 0,
           steps,
           img: img || "https://foodtango.com.au/img/ui/noimage.png",
           type
       }) 
       console.log(createRecipe)
       let dietsDB = await Diet.findAll({
           where: {
               name: diets
           }
       })
    //    console.log(dietsDB)
       createRecipe.addDiet(dietsDB);
    //    console.log(createRecipe)
       res.status(200).send("Se creo de forma exitosa su receta")

    }catch(err){
        console.log(err)
    }

})


module.exports = router;
