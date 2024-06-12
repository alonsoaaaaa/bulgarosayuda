"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockIcon, MilkIcon, ThermometerIcon } from "lucide-react";
import { ABeeZee } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
const abeezee = ABeeZee({
  weight: "400",
  subsets: ["latin"],
});
type FormData = {
  kefir: number;
  milk: number;
  temperature: number;
  time: number;
};

export default function KefirCalculator2() {
  const calculateParam = (data: FormData, calculus: any) => {
    let dataWithCalculus = { ...data };
    if (currentCalculus === "temperature") {
      dataWithCalculus.temperature =
        20 / (data.kefir * 0.5) / (data.milk * 0.5) / (data.time * 0.5);
    } else if (currentCalculus === "kefir") {
      dataWithCalculus.kefir =
        8 / (data.temperature * 0.5) / (data.milk * 0.5) / (data.time * 0.5);
    } else if (currentCalculus === "milk") {
      dataWithCalculus.milk =
        10 / (data.temperature * 0.5) / (data.kefir * 0.5) / (data.time * 0.5);
    } else if (currentCalculus === "time") {
      dataWithCalculus.time =
        12 / (data.temperature * 0.5) / (data.kefir * 0.5) / (data.milk * 0.5);
    }
    let dataFormatted = Object.fromEntries(
      Object.entries(dataWithCalculus).map(([key, value]) => [
        key,
        Math.round(value * 100) / 100,
      ])
    );
    calculus.current = dataFormatted;
    console.log("calculus", calculus.current);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let displayCalculus: any = useRef();
  const onSubmit = (data: any) => {
    calculateParam(data, displayCalculus);
    setShowResult(true);
    console.log("displayCalculus", displayCalculus);
  }; // onsubmit function is a callback for handleSubmit, will be called when the form is submitted

  const [showResult, setShowResult] = useState(false);
  const [currentCalculus, setCurrentCalculus] = useState<
    "time" | "milk" | "kefir" | "temperature"
  >("time");

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-4">
        <h1 className={abeezee.className + "text-orange-950"}>
          <Image
            src="/calc_bg.webp"
            alt="kefir"
            width={100}
            height={100}
            className="object-cover rounded-full transition-transform duration-300 ease-in-out active:scale-110 active:animate-wiggle"
          />
        </h1>
        <h2 className="font-mono font-extrabold text-sm">
          <span className="block text-center">Calcula las cantidades</span>
          <span className="block text-center">
            para colar un kéfir riquísimo{" "}
          </span>
        </h2>
        <header className="flex flex-col justify-between">
          <div className="flex justify-center">
            <Button
              className="bg-yellow-500 text-yellow-800 hover:bg-yellow-600 text-sm w-fit py-0 h-min rounded-xl gap-1"
              onClick={() => {
                setCurrentCalculus("time");
              }}
            >
              Tiempo <ClockIcon />
            </Button>
            <Button
              className="bg-amber-200  text-amber-600 hover:bg-amber-300 text-sm w-fit py-0 h-min rounded-xl gap-1"
              onClick={() => {
                setCurrentCalculus("kefir");
              }}
            >
              Cucharadas{" "}
              <Image src="/spoons.svg" width={24} height={24} alt="" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-orange-500 text-orange-800 hover:bg-orange-600 text-sm w-fit py-0 h-min rounded-xl gap-1"
              onClick={() => {
                setCurrentCalculus("milk");
              }}
            >
              Leche <MilkIcon fill="white" color="black" />
            </Button>
            <Button
              className="bg-red-200  text-red-600 hover:bg-red-300 text-sm w-fit py-0 h-min rounded-xl gap-1"
              onClick={() => setCurrentCalculus("temperature")}
            >
              Temperatura <ThermometerIcon className="text-gray-700" />
            </Button>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {currentCalculus !== "milk" && (
            <div>
              <Label htmlFor="milk">Cantidad de leche (en litros)</Label>
              <Input
                type="number"
                step="0.1"
                id="milk"
                placeholder="ejemplo: 0.5"
                {...register("milk", { required: true })}
              />
            </div>
          )}
          {currentCalculus !== "temperature" && (
            <div>
              <Label htmlFor="temperature">Temperatura (°C):</Label>
              <Input
                type="number"
                step="0.1"
                id="temperature"
                placeholder="ejemplo: 22"
                {...register("temperature", { required: true })}
              />
            </div>
          )}
          {currentCalculus !== "kefir" && (
            <div>
              <Label htmlFor="kefir">Cucharadas de kefir (100g c/u):</Label>
              <Input
                type="number"
                step="0.1"
                id="kefir"
                placeholder="ejemplo: 2"
                {...register("kefir", { required: true })}
              />
            </div>
          )}
          {currentCalculus !== "time" && (
            <div>
              <Label htmlFor="time">Tiempo de fermentación (horas):</Label>
              <Input
                type="number"
                step="0.1"
                id="time"
                placeholder="24"
                {...register("time", { required: true })}
              />
            </div>
          )}
          <Button type="submit" className="bg-pink-500 hover:bg-pink-400">
            Calcular
          </Button>
        </form>
        {showResult && (
          <div>
            <h2 className="font-mono text-xl font-bold">Resultados</h2>
            <h1>
              Para que salga un kéfir rico a{" "}
              <span
                className={currentCalculus === "temperature" ? "font-bold" : ""}
              >
                {displayCalculus.current?.temperature + "°C grados "}
                {/* se usa el watch para acceder al estado, no de podria usar el valor directamente con data.temperature */}
              </span>
              con{" "}
              <span className={currentCalculus === "kefir" ? "font-bold" : ""}>
                {displayCalculus.current?.kefir + " cucharada(s) "}
              </span>
              y{" "}
              <span className={currentCalculus === "milk" ? "font-bold" : ""}>
                {displayCalculus.current?.milk + " litro(s) "}
              </span>
              de leche tendrias que dejarlo{" "}
              <span className={currentCalculus === "time" ? "font-bold" : ""}>
                {(displayCalculus.current?.time * 60 * 10).toFixed(0) +
                  " minuto(s) / " +
                  displayCalculus.current?.time * 10 +
                  " hora(s) "}
              </span>
              fermentandose.
            </h1>
          </div>
        )}
      </div>
    </>
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   {/* register your input into the hook by invoking the "register" function */}
    //   <input defaultValue="test" {...register("example")} />

    //   {/* include validation with required or other standard HTML validation rules */}
    //   <input {...register("exampleRequired", { required: true })} />
    //   {/* errors will return when field validation fails  */}
    //   {errors.exampleRequired && <span>This field is required</span>}

    //   <input type="submit" />
    // </form>
  );
}
