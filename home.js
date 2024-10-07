// HomePage.js
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/recipes/popular')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

