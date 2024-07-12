import mongoose, { Schema, Document, Model } from "mongoose";

export interface Recipes extends mongoose.Document {
  recipe_name: string;
  ingredients: string;
  total_time: string;
  instructions: string;
  nutritional_facts: string;
  image_url: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const RecipeSchema = new mongoose.Schema<Recipes>({
  recipe_name: {
    type: String,
    required: [true, "Please provide a name for this recipe."],
  },
  ingredients: {
    type: String,
    required: [true, "Please provide the ingredients for this recipe."],
  },
  total_time: { type: String },
  instructions: {
    type: String,
    required: [true, "Please provide instructions for this recipe."],
  },
  nutritional_facts: { type: String },
  image_url: { type: String },
});

const Recipe: Model<Recipes> =
  mongoose.models.Recipe || mongoose.model<Recipes>("Recipe", RecipeSchema);

export default Recipe;
