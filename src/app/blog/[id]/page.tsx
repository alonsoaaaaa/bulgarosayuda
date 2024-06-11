"use client";
import React from "react";
import { recipes } from "@/lib/blog";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";

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
                <h1>{recipe.title}</h1>
                <p>{recipe.ingredients}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default BlogPage;
