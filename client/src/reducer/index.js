
const initialState = {
    recipes : [],

};

function rootReducer (state = initialState, action){
   switch (action.type) {
       case "GET_RECIPES":
           return {
               ...state, //copio el estado
               recipes: action.payload //y le digo que almacene en recipes (que en principio está vacio) lo que tengo en la action.payload
           }
           
           
   
       default:
           return state;
   }
}

export default rootReducer;