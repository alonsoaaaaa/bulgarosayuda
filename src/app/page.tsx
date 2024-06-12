import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  CalculatorIcon,
  CircleHelpIcon,
  ClockIcon,
  Earth,
  EqualIcon,
  GlassWater,
  MilkIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    //Navbar
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-50 p-8 gap-3">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">
            bulgarosayuda.com
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Todo lo que necesitas para cuidar tus búlgaros. <br />
            En un solo lugar.
          </p>

          <section className="mt-8">
            <Image
              src="/milk-kefir-in-bowl.png"
              alt="Main Image"
              width={1920}
              height={1080}
              className="w-full max-w-md mx-auto rounded-md"
            />
          </section>
        </div>

        <section className="flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold">
            ¿Qué es el kefir y para qué sirve?
          </h2>
          <p className="text-orange-900 max-w-prose mt-2">
            Es una bebida ancestral que se ha consumido por miles de años en
            America Latina, Europa y Asia. Se obtiene de la fermentación de la
            leche entera y es una fuente rica de probióticos, que son bacterias
            benéficas para nuestro sistema digestivo.
          </p>
        </section>

        <section className="flex flex-col items-center text-center">
          <h2 className="flex text-xl font-semibold justify-center items-center gap-1">
            Calculadora de leche <CalculatorIcon />
          </h2>
          <p className="text-orange-900 mt-2 max-w-prose">
            Prueba nuestra calculadora de leche para saber con exactitud cuanta
            leche y tiempo necesitas para hacer un kefir perfecto.
          </p>
          <div className="flex items-center">
            <h1 className="font-bold">1L</h1>
            <MilkIcon size={100} className="ml-0.5" />
            <PlusIcon size={50} />
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/bulgaros.svg"
                width="150"
                height="150"
                className="fill-slate-600"
                alt=""
              />
              <ClockIcon size={30} />
            </div>
            <EqualIcon size={50} />
            <GlassWater size={70} />
            <CircleHelpIcon size={50} />
          </div>

          <Button className="bg-pink-500 hover:bg-pink-400">
            <Link href={"/calculator"}>Calcular</Link>
          </Button>
        </section>

        <section className="flex flex-col items-center text-center">
          <h1 className="font-semibold text-xl">
            Recetas hechas por otras amantes de los búlgaros
          </h1>
          <p className="text-orange-900 max-w-prose mt-2">
            Descubre las mejores recetas de kefir, yogurt y quesos hechos en
            casa por nuestra comunidad.
          </p>
          <div className="flex justify-center gap-3">
            <Image
              src="/kefir_smoothie.jpg"
              alt="Image 1"
              width={200}
              height={200}
              className="w-24 h-24 object-cover rounded-full transition-transform duration-300 ease-in-out active:scale-110 active:animate-wiggle"
            />
            <Image
              src="/kefir-cheese.jpg"
              alt="Image 2"
              width={200}
              height={200}
              className="w-24 h-24 object-cover rounded-full transition-transform duration-300 ease-in-out active:scale-110 active:animate-wiggle"
            />
            <Image
              src="/Kefir-Cream.jpg"
              alt="Image 3"
              width={200}
              height={200}
              className="w-24 h-24 object-cover rounded-full transition-transform duration-300 ease-in-out active:scale-110 active:animate-wiggle"
            />
          </div>
        </section>
        <Link href={"/blog"}>
          <Button className="bg-pink-500 hover:bg-pink-400">Ver recetas</Button>
        </Link>
      </div>
      <section className="flex flex-col items-center text-center">
        <h1 className="font-semibold text-xl">
          Crea un chat de búlgaros en tu ciudad
        </h1>
        <p className="text-orange-900 max-w-prose mt-2">
          Registrate y crea un grupo para regalar o vender bulgaros cerca de ti
          y ayuda a más personas a disfrutar de los beneficios de esta bebida.
        </p>
        <div className="flex">
          <UsersIcon size={100} color="black" fill="pink" />
          {/* <Earth size={100} className="text-green-900" /> */}

          <Image
            src={"/world-americas.svg"}
            width={100}
            height={100}
            alt="earth"
          />
        </div>
        <Button className="bg-pink-500 hover:bg-pink-400">Crear grupo</Button>
      </section>
    </>
  );
}
