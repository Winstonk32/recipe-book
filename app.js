 // Sample data for popular recipes (this can be replaced with data fetched from an API)
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

// Array to store saved recipes
let savedRecipes = [];

// Elements from the DOM
const homePage = document.getElementById('home-page');
const recipePage = document.getElementById('recipe-page');
const recipeBookPage = document.getElementById('recipe-book-page');

const popularRecipesList = document.getElementById('popular-recipes');
const savedRecipesList = document.getElementById('saved-recipes');
const recipeTitle = document.getElementById('recipe-title');
const recipeImage = document.getElementById('recipe-image');
const recipeIngredients = document.getElementById('recipe-ingredients');
const recipeInstructions = document.getElementById('recipe-instructions');

// Display popular recipes on the home page
function displayPopularRecipes() {
    popularRecipesList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
        `;
        popularRecipesList.appendChild(recipeDiv);
    });
}

// View a single recipe
function viewRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        recipeTitle.textContent = recipe.title;
        recipeImage.src = recipe.image;
        recipeIngredients.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        recipeInstructions.textContent = recipe.instructions;

        // Switch to the recipe page
        homePage.style.display = 'none';
        recipeBookPage.style.display = 'none';
        recipePage.style.display = 'block';
    }
}

// Save recipe to the personal recipe book
document.getElementById('save-recipe-button').addEventListener('click', function () {
    const recipeTitleText = recipeTitle.textContent;
    const savedRecipe = recipes.find(r => r.title === recipeTitleText);

    if (savedRecipe && !savedRecipes.some(r => r.id === savedRecipe.id)) {
        savedRecipes.push(savedRecipe);
        alert(`${savedRecipe.title} has been added to your recipe book!`);
    }
});

// Display saved recipes in the personal recipe book
function displaySavedRecipes() {
    savedRecipesList.innerHTML = '';
    if (savedRecipes.length === 0) {
        savedRecipesList.innerHTML = '<p>No recipes saved yet.</p>';
    } else {
        savedRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-card');
            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            `;
            savedRecipesList.appendChild(recipeDiv);
        });
    }
}

// Delete a recipe from the personal recipe book
function deleteRecipe(recipeId) {
    savedRecipes = savedRecipes.filter(r => r.id !== recipeId);
    displaySavedRecipes();
}

// Search functionality (Basic implementation for demo)
document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.toLowerCase();
    const searchResults = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));

    popularRecipesList.innerHTML = '';
    if (searchResults.length === 0) {
        popularRecipesList.innerHTML = '<p>No recipes found.</p>';
    } else {
        searchResults.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-card');
            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
            `;
            popularRecipesList.appendChild(recipeDiv);
        });
    }
});

// Navigation between pages
document.getElementById('home-link').addEventListener('click', function () {
    homePage.style.display = 'block';
    recipePage.style.display = 'none';
    recipeBookPage.style.display = 'none';
});

document.getElementById('recipe-book-link').addEventListener('click', function () {
    displaySavedRecipes();
    homePage.style.display = 'none';
    recipePage.style.display = 'none';
    recipeBookPage.style.display = 'block';
});

// Initial function to display popular recipes when page loads
window.onload = function () {
    displayPopularRecipes();
};

// Export functions for testing
if (typeof module !== 'undefined') {
    module.exports = {
        viewRecipe,
        saveRecipe,
        deleteRecipe,
        displayPopularRecipes
    };
}
