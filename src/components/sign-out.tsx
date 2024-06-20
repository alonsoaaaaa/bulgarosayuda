import { signOut } from "@/auth";
import React from "react";
import { Button } from "./ui/button";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="bg-red-500 hover:bg-red-600" type="submit">
        Cerrar sesión
      </Button>
    </form>
  );
}

export default SignOut;
