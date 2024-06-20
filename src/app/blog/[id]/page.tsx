"use client";
import React from "react";
import { recipes } from "@/lib/blog";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Image from "next/image";

function BlogPage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col flex-wrap">
      <Navbar />
      <div className="flex flex-col py-10">
        {recipes.map((recipe) => {
          if (recipe.id === parseInt(id as string)) {
            return (
              <div key={recipe.id}>
                <h1 className="text-fuchsia-500 text-3xl py-2">
                  {recipe.title}
                </h1>
                <div className="flex self-center content-center justify-center">
                  <Image
                    src={recipe.images[0]}
                    alt={recipe.title}
                    width={400}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-2xl">Ingredientes</h2>
                {recipe.ingredients.map((ingredient) => (
                  <p key={ingredient}>{ingredient}</p>
                ))}
                <h2 className="text-2xl">Preparacion</h2>
                {recipe.preparation.map((step) => (
                  <p key={step}>{step}</p>
                ))}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default BlogPage;
