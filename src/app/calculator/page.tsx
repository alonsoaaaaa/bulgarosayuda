"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockIcon, MilkIcon, ThermometerIcon } from "lucide-react";
import { ABeeZee } from "next/font/google";
import Image from "next/image";
import { MutableRefObject, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const abeezee = ABeeZee({
  weight: "400",
  subsets: ["latin"],
});

export default function KefirCalculator2() {
  const calculateParam = (
    data: CalculatorData,
    calculus: MutableRefObject<CalculatorData>
  ) => {
    let dataWithCalculus = { ...data };
    if (currentCalculus === "temperature") {
      dataWithCalculus.temperature =
        (12000 * data.milk) / 1000 / (data.kefir * 20 * data.time);
    } else if (currentCalculus === "kefir") {
      dataWithCalculus.kefir =
        (12000 * data.milk) / 1000 / (data.temperature * data.time);
    } else if (currentCalculus === "milk") {
      dataWithCalculus.milk =
        (data.time * (data.kefir * 20 * data.temperature)) / 12000;
    } else if (currentCalculus === "time") {
      dataWithCalculus.time =
        (12000 * data.milk) / 1000 / (data.kefir * 20 * data.temperature);
    }
    calculus.current = {
      kefir: Math.round(dataWithCalculus.kefir * 100) / 100,
      milk: Math.round(dataWithCalculus.milk * 100) / 100,
      temperature: Math.round(dataWithCalculus.temperature * 100) / 100,
      time: Math.round(dataWithCalculus.time * 100) / 100,
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorData>();
  let displayCalculus = useRef<CalculatorData>({
    kefir: 0,
    milk: 0,
    temperature: 0,
    time: 0,
  });
  const onSubmit: SubmitHandler<CalculatorData> = (data) => {
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
              className={`bg-blue-500 text-fuchsia-950 hover:bg-blue-600 text-sm w-fit py-0 h-min rounded-xl gap-1 ${
                currentCalculus === "time"
                  ? "font-bold bg-blue-600 underline"
                  : ""
              }`}
              onClick={() => {
                setCurrentCalculus("time");
                setShowResult(false);
              }}
            >
              Tiempo <ClockIcon />
            </Button>
            <Button
              className={`bg-amber-200  text-amber-600 hover:bg-amber-400 text-sm w-fit py-0 h-min rounded-xl gap-1 ${
                currentCalculus === "kefir"
                  ? "font-bold bg-amber-400 underline"
                  : ""
              }`}
              onClick={() => {
                setCurrentCalculus("kefir");
                setShowResult(false);
              }}
            >
              Cucharadas{" "}
              <Image src="/spoons.svg" width={24} height={24} alt="" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              className={`bg-orange-500 text-orange-800 hover:bg-orange-600 text-sm w-fit py-0 h-min rounded-xl gap-1 ${
                currentCalculus === "milk"
                  ? "font-bold bg-orange-600 underline"
                  : ""
              }`}
              onClick={() => {
                setCurrentCalculus("milk");
                setShowResult(false);
              }}
            >
              Leche <MilkIcon fill="white" color="black" />
            </Button>
            <Button
              className={`bg-red-200  text-red-600 hover:bg-red-300 text-sm w-fit py-0 h-min rounded-xl gap-1 ${
                currentCalculus === "temperature"
                  ? "font-bold bg-red-300 underline"
                  : ""
              }`}
              onClick={() => {
                setCurrentCalculus("temperature");
                setShowResult(false);
              }}
            >
              Temperatura <ThermometerIcon className="text-gray-700" />
            </Button>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {currentCalculus !== "milk" && (
            <div>
              <Label htmlFor="milk">Cantidad de leche (en mililitros)</Label>
              <Input
                type="number"
                step="1"
                id="milk"
                placeholder="ejemplo: 1000 = 1 litro"
                {...register("milk", { required: true, valueAsNumber: true })}
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
                placeholder="ejemplo: 20 (ambiente)"
                {...register("temperature", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          )}
          {currentCalculus !== "kefir" && (
            <div>
              <Label htmlFor="kefir">Cucharadas de búlgaros (20g c/u):</Label>
              <Input
                type="number"
                step="0.1"
                id="kefir"
                placeholder="ejemplo: 2"
                {...register("kefir", { required: true, valueAsNumber: true })}
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
                {...register("time", { required: true, valueAsNumber: true })}
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
                {currentCalculus !== "kefir"
                  ? displayCalculus.current?.kefir + " cucharada(s)"
                  : displayCalculus.current?.kefir / 20 + " cucharada(s) "}
              </span>
              y{" "}
              <span className={currentCalculus === "milk" ? "font-bold" : ""}>
                {displayCalculus.current?.milk + " litro(s) "}
              </span>
              de leche tendrias que dejarlo{" "}
              <span className={currentCalculus === "time" ? "font-bold" : ""}>
                {`${Math.floor(
                  displayCalculus.current?.time
                )} hora(s) y ${Math.round(
                  (displayCalculus.current?.time % 1) * 60
                )} minuto(s) `}
              </span>
              fermentandose.
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
