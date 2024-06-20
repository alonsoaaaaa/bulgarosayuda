import { signIn } from "@/auth";
import { Button } from "./ui/button";
import Facebook from "next-auth/providers/facebook";
import { FacebookIcon, UserCheckIcon } from "lucide-react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("facebook");
      }}
      className="flex"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-mono">
          Inicia sesión para poder acceder a los grupos y preguntar sobre las
          recetas
        </h1>
        <UserCheckIcon className="" size={100} color="blue" />
        <Button
          className="bg-blue-500 hover:bg-blue-600 mx-1 gap-1"
          type="submit"
        >
          Inicia sesión con Facebook <FacebookIcon />
        </Button>
      </div>
    </form>
  );
}
