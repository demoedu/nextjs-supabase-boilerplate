"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { createRecipe } from "@/lib/actions/recipe.actions";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ingredients: z.array(z.string()).min(1, {
    message: "At least one ingredient is required.",
  }),
  instructions: z.string().min(1, {
    message: "Instructions are required.",
  }),
});

const RecipeForm = () => {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ingredients: [],
      instructions: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const recipe = await createRecipe(values as Omit<Recipe, 'id'>);

    router.push(`/recipes/${recipe.id}`);
  };

  const handleAddIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setIngredients([...ingredients, e.currentTarget.value]);

      form.setValue("ingredients", [...ingredients, e.currentTarget.value]);

      setIngredientInput("");
      e.currentTarget.value = "";
    }
  };

  const handleAddIngredientButton = () => {
    if (ingredientInput.trim() === "") return;

    const updatedIngredients = [...ingredients, ingredientInput.trim()];

    setIngredients(updatedIngredients);

    form.setValue("ingredients", updatedIngredients, { shouldValidate: true });

    setIngredientInput("");
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    
    form.setValue(
      "ingredients",
      ingredients.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Recipe Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={() => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <section className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {ingredients.map((ingredient, index) => (
                    <Ingredient
                      key={index}
                      ingredient={ingredient}
                      onRemove={() => handleRemoveIngredient(index)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. 2 cups of flour"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={handleAddIngredient}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddIngredientButton}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
                <FormMessage />
              </section>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Instructions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;

const Ingredient = ({
  ingredient,
  onRemove,
}: {
  ingredient: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center border rounded-md p-2">
      {ingredient}{" "}
      <XIcon className="w-4 h-4 cursor-pointer" onClick={onRemove} />
    </div>
  );
};
