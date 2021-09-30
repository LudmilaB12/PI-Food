const { API_KEY } = process.env
const axios = require('axios');
const {Diet, Recipe} = require('../db')

const getApiInfo = async () => {
    const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const infoRecipe = await apiResponse.data.results.map( el => {
        return{
            name: el.title,
            id: el.id,
            resume: el.summary,
            score: el.spoonacularScore,
            healtyscore: el.healthScore,
            steps: el.analyzedInstructions,
            img: el.image,
            diets: el.diets,
            type: el.dishTypes
        }
    })
    
    return infoRecipe;
}

const getDBifno = async () => {
    const recipesDB = await Recipe.findAll({
        include:{ 
            model: Diet,
            attributes: ["name"]
           }
    })
    console.log(recipesDB)
    return recipesDB;
}

const getAllinfo = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBifno();
    const allInfo = apiInfo.concat(dbInfo);
    return apiInfo
}




module.exports= {
    getApiInfo,
    getDBifno,
    getAllinfo
}
   
