import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { SignIn } from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { PaperclipIcon, PartyPopperIcon } from "lucide-react";
async function LoginPage() {
  const session = await auth();
  console.log("session", session);
  return (
    <>
      <Navbar />
      <div className="flex justify-center py-2">
        {session ? (
          <Card className="flex flex-col justify-between w-[350px] border border-gray-400">
            <CardHeader className="flex text-center">
              <CardTitle className="flex text-fuchsia-400">
                <p>{"Hola, " + session.user?.name}</p>
                <Image
                  src={session.user?.image || ""}
                  alt={session.user?.name || ""}
                  width={60}
                  height={60}
                />
              </CardTitle>
              {/* <CardDescription className="font-semibold">
    {stateimage.state}
  </CardDescription> */}
            </CardHeader>
            <CardContent className="text-pretty font-serif border border-slate-200">
              <p className="flex items-center">
                Ahora ya puedes unirte a un grupo para intercambiar información
                sobre los búlgaros.
                <PartyPopperIcon size={100} color="yellow" />
              </p>
              <p className="">Dejanos un comentario en la seccion de Recetas</p>
              <p className="font-semibold">¡Bienvenida!</p>
            </CardContent>
            <CardFooter className="justify-center">
              <SignOut />
            </CardFooter>
          </Card>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
}

export default LoginPage;

{
  /* <div className="flex flex-col items-center">
<h1 className="text-xl font-bold">Hola, {session.user?.name}</h1>
<Image
  src={session.user?.image || ""}
  alt={session.user?.name || ""}
  width={60}
  height={60}
/>
<p className="">
  Ahora ya puedes crear un grupo para intercamabiar información sobre
  los búlgaros.
</p>
<SignOut />
</div> */
}
