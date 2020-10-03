let searchInput= document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn'); 
let searchResult = document.getElementById('searchResult');
let recipeDetalisDiv = document.getElementById('recipeDetalisDiv');
let allRecipes = [];

async function getRecipe(term)
{
  let apiResponse =await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
      apiResponse = await apiResponse .json();
      allRecipes=apiResponse.recipes;
      displyAllRecipes();
 
}

searchBtn.addEventListener('click' ,function (){
  getRecipe(searchInput.value);
})

function displyAllRecipes()
{
  let cartoona = `` ;
  for(let i=0 ; i< allRecipes.length ; i++)
  {
    let myId = "'"+allRecipes[i].recipe_id+"'";


    cartoona +=`<div onclick="getRecipeDetalis(${myId})" class="col-md-4">
    <div class="recipe">
    <img src="${allRecipes[i].image_url}" class="w-100" alt="">      
      <h5 class="color-mine font-weight-bolder py-2">${allRecipes[i].title}</h5>
      <p>${allRecipes[i].publisher}</p>
    </div>
  </div>`;
  }
  searchResult.innerHTML = cartoona;
}
async function getRecipeDetalis(id)
{
   let recipeDetalis=[];
   let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
   apiResponse = await apiResponse.json();
   recipeDetalis = apiResponse.recipe;
   displayRecipeDetails(recipeDetalis);
}
function displayRecipeDetails(recipeDetalis)
{
   let cartoona = `<div class="recipeDetails">
   <h4 class="color-mine py-2 font-weight-bolder">${recipeDetalis.title}</h4>
   <img src="${recipeDetalis.image_url}" class="w-100" alt="">
   <ul class="list-unstyled">`;
   for (let i = 0; i < recipeDetalis.ingredients.length; i++) 
   {
     cartoona +=`<li class="py-2 font-weight-bolder">${recipeDetalis.ingredients[i]}</li>` 
      
   }
   cartoona +=`</ul>
   </div>`;
   recipeDetalisDiv.innerHTML = cartoona;
}