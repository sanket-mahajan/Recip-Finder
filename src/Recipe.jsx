import React, { useState } from "react";
import "./Recipe.css";
import runChat from "./config/gemini";

function Recipe() {
  const [ingredients, setIngredients] = useState("");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `Generate a recipe using the following ingredients: ${ingredients}, type: ${type}, region: ${region}`;

    try {
      const response = await runChat(query);

      setGeneratedRecipe(response); // Update UI with the generated recipe
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to generate recipe. Please try again."); // Update error state
    }
  };

  return (
    <div className="Recipe">
      <h1>Recipe Finder</h1>

      <div className="options">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="ingredients">Ingredients :</label>
            <input
              type="text"
              id="ingredients"
              placeholder="Enter Ingredients..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="type">Type :</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="region">Region :</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">Select Region</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
          <button type="submit">Generate Recipe</button>
        </form>
      </div>

      {generatedRecipe && (
        <div className="recipe-container">
          <p>{generatedRecipe}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Recipe;
