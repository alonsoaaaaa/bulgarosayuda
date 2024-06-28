import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getStateInfo } from "@/lib/utils";
import cities from "@/lib/data";
import GroupSection from "./group-section";

async function GroupsPage() {
  const session = await auth();
  const stateInfo = getStateInfo(cities);

  console.log("CESIOn", session ? "Sí" : "No");
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-2">
        {!session ? (
          <>
            <h1 className="text-2xl font-mono">Grupos</h1>
            <p className="text-lg font-mono">
              ¡Bienvenida a la página de grupos!
            </p>
            <div></div>
            <GroupSection stateInfo={stateInfo} />

            <Link href="https://chat.whatsapp.com/HWQFTvrdUU12t5RwBiJOZr">
              <Button className="text-black font-bold  bg-orange-500 hover:bg-orange-600">
                Solicitar un grupo
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="flex size-full text-xl font-mono justify-center items-center pt-10 text-center">
              Para chatear en un grupo, primero inicia sesión.
            </h2>
            <Link href="/login">
              <Button className="text-yellow-800 font-bold  bg-green-500 hover:bg-green-600">
                Iniciar sesión
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default GroupsPage;
