const {
    viewRecipe,
    saveRecipe,
    deleteRecipe,
    displayPopularRecipes
} = require('./app');

// Mock data
const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "https://example.com/carbonara.jpg",
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black pepper"],
        instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all with pasta."
    },
    {
        id: 2,
        title: "Chicken Alfredo",
        image: "https://example.com/alfredo.jpg",
        ingredients: ["Fettuccine", "Chicken", "Cream", "Parmesan", "Garlic"],
        instructions: "Cook pasta. Cook chicken. Make sauce with cream and cheese. Combine with pasta."
    }
];

// Mock DOM elements
document.body.innerHTML = `
    <div id="recipe-page" style="display: none;"></div>
    <h1 id="recipe-title"></h1>
    <img id="recipe-image" src="">
    <ul id="recipe-ingredients"></ul>
    <p id="recipe-instructions"></p>
`;

describe('Recipe Application', () => {
    // Test viewing a recipe
    test('viewRecipe displays the correct recipe information', () => {
        const recipeId = 1;
        viewRecipe(recipeId);

        expect(document.getElementById('recipe-title').textContent).toBe('Spaghetti Carbonara');
        expect(document.getElementById('recipe-image').src).toBe('https://example.com/carbonara.jpg');
        expect(document.getElementById('recipe-ingredients').children.length).toBe(5);
        expect(document.getElementById('recipe-instructions').textContent).toBe(
            "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all with pasta."
        );
    });

    // Test saving a recipe
    test('saveRecipe adds the recipe to savedRecipes array', () => {
        const savedRecipes = [];
        const recipe = recipes[0];

        saveRecipe(recipe, savedRecipes);
        expect(savedRecipes.length).toBe(1);
        expect(savedRecipes[0].title).toBe('Spaghetti Carbonara');
    });

    // Test deleting a recipe
    test('deleteRecipe removes the correct recipe from savedRecipes array', () => {
        let savedRecipes = [...recipes]; // Clone the original array

        deleteRecipe(1, savedRecipes);
        expect(savedRecipes.length).toBe(1);
        expect(savedRecipes[0].title).toBe('Chicken Alfredo');
    });

    // Test displaying popular recipes
    test('displayPopularRecipes displays recipes correctly', () => {
        document.body.innerHTML = `<div id="popular-recipes"></div>`;

        displayPopularRecipes(recipes);

        const popularRecipesList = document.getElementById('popular-recipes');
        expect(popularRecipesList.children.length).toBe(2);
    });
    


});
