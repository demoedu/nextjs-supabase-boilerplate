"use server";

import { Recipe } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { createSupabaseClient } from "../supabase";

// Get all recipes, with author details and unlocked status for current user
export const getRecipes = async () => {
  const { userId } = await auth(); // Get the current user (can be null if not signded in)
  const supabase = createSupabaseClient(); // Initialize supabase client

  // Get all recipes from the database
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("id, name, ingredients, user_id");

  if (error) throw new Error(error.message);

  // Get all user ids from the recipes (these are the authors of the recipes)
  const userIds = recipes.map((recipe) => recipe.user_id);

  const clerk = await clerkClient();
  const users = await clerk.users.getUserList({ userId: userIds }); // Get users data for the recipe authors

  // Get unlocked recipes for current user
  const { data: unlockedRecipes, error: unlockedError } = await supabase
    .from("recipes_unlocked")
    .select("recipe_id")
    .eq("user_id", userId);

  if (unlockedError) throw new Error(unlockedError.message);

  const unlockedRecipeIds = new Set(unlockedRecipes.map((r) => r.recipe_id)); // Store the unlocked recipe ids in a set for O(1) lookup

  // Merge all data
  const recipesWithUserDetails = recipes.map((recipe) => {
    const user = users.data.find((user) => user.id === recipe.user_id);
    return {
      ...recipe,
      userFirstName: user?.firstName,
      userImageUrl: user?.imageUrl,
      unlocked: unlockedRecipeIds.has(recipe.id) || recipe.user_id === userId, // Check if the recipe is unlocked or the user is the author to grant access
    };
  });

  return recipesWithUserDetails; // Return the recipes with user details and unlocked status
};

// Get a single recipe by id, with author details and unlocked status for current user
export const getRecipe = async (id: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  // Fetch the recipe first
  const { data: recipeData, error: recipeError } = await supabase
    .from("recipes")
    .select()
    .eq("id", id)
    .single(); // since we're expecting only one row

  if (recipeError) throw new Error(recipeError.message);

  // If the user is the author, return the recipe directly
  if (recipeData.user_id === userId) return recipeData;

  // Otherwise check if the recipe is unlocked for this user
  const { data: unlockedRecipe, error: unlockedError } = await supabase
    .from("recipes_unlocked")
    .select()
    .eq("user_id", userId)
    .eq("recipe_id", id);

  if (unlockedError) throw new Error(unlockedError.message);

  // If it's not unlocked, return null
  if (unlockedRecipe.length === 0) return null;

  return recipeData;
};

// Create a new recipe
export const createRecipe = async (recipe: Omit<Recipe, 'id'>) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("recipes")
    .insert({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      user_id: userId,
    })
    .select();

  if (error) throw new Error(error.message);

  return data[0]; // Return the created recipe so we can redirect to it
};

// Get all recipes created by the current user
export const getUserRecipes = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};

// Get all recipes unlocked by the current user
export const getUnlockedRecipes = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("recipes_unlocked")
    .select("recipes:recipe_id (*)")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const recipes = data.map((entry) => entry.recipes as unknown as Recipe);

  return recipes;
};

// Unlock a recipe for the current user
export const unlockRecipe = async (recipeId: string) => {
  const { userId, has } = await auth();

  if (!userId) redirect("/sign-in");

  const supabase = createSupabaseClient();

  // Determine user's limit based on Clerk Billing Plan and features
  let limit: number | null = null;

  if (has({ feature: "recipe_limit_unlimited" })) {
    limit = null; // no limit
  } else if (has({ feature: "recipe_limit_100" })) {
    limit = 100;
  } else if (has({ feature: "recipe_limit_3" })) {
    limit = 3;
  } else {
    limit = 1; // default fallback just in case
    console.error(
      "User has no recipe limit set. Check Clerk Billing Plan and features for spelling."
    );
  }

  // Check how many recipes the user has unlocked
  const { count, error: countError } = await supabase
    .from("recipes_unlocked")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (countError) throw new Error(countError.message);

  // If limit is not unlimited, enforce it
  if (count !== null && limit !== null && count >= limit) {
    return { success: false, message: "limit reached" };
  }

  // Unlock the recipe
  const { error } = await supabase
    .from("recipes_unlocked")
    .insert({ user_id: userId, recipe_id: recipeId });

  if (error) throw new Error(error.message);

  return { success: true, message: "recipe unlocked" };
};
