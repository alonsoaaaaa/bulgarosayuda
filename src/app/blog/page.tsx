import Navbar from "@/components/navbar";
import React from "react";
import { recipes } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function RecipesPage() {
  return (
    <div className="flex flex-col flex-wrap">
      <Navbar />
      <div className="flex max-w-[1100px] flex-wrap max-sm:flex-col gap-3 py-2 px-2 max-sm:items-center justify-between">
        {recipes.map((recipe) => (
          <Card
            className="flex flex-col justify-between w-[350px] border border-fuchsia-400"
            key={recipe.id}
          >
            <CardHeader>
              <CardTitle className="text-gray-600">{recipe.title}</CardTitle>
              <CardDescription className="font-semibold">
                {recipe.preparation.slice(0, 3).map((step) => {
                  console.log(step);
                  return (
                    <>
                      <span key={step} className="font-sans text-slate-800">
                        {step}
                      </span>
                      <br />
                    </>
                  );
                })}
                {". . ."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                className="w-full h-40 object-cover rounded-md"
                width={350}
                height={200}
                src={(recipe.images && recipe.images[0]) || ""}
                alt={recipe.title}
              />
            </CardContent>
            <CardFooter className="justify-center">
              <Link href={`/blog/${recipe.id}`}>
                <Button className="bg-pink-400 self-center">Ver receta</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;

// import * as React from "react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export function CardWithForm() {
//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Create project</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="Name of your project" />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter>
//     </Card>
//   )
// }
