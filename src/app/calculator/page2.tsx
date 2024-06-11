"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockIcon, MilkIcon, ThermometerIcon } from "lucide-react";
import { ABeeZee } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
const abeezee = ABeeZee({
  weight: "400",
  subsets: ["latin"],
});

const KefirCalculator = () => {
  const [milkVolume, setMilkVolume] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [fermentationTime, setFermentationTime] = useState(0);
  const [kefirGrains, setKefirGrains] = useState(0);
  const [result, setResult] = useState("");
  const [currentCalculus, setCurrentCalculus] = useState<
    "time" | "milk" | "kefir_s" | "temperature"
  >("time");
  const calculateTime = () => {
    const time =
      24 / (kefirGrains * 0.5) / (milkVolume * 0.5) / (temperature * 0.5);
    setResult(`${time} horas`);
  };
  const handleCalculate = () => {
    if (currentCalculus === "time") {
      calculateTime();
    } else if (currentCalculus === "milk") {
      calculateMilk();
    } else if (currentCalculus === "kefir_s") {
      calculateKefir();
    } else if (currentCalculus === "temperature") {
      calculateTemperature();
    } else {
      console.error("Unknown calculus");
    }
  };
  console.log(currentCalculus);

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
        <h2 className="font-mono font-extrabold">Calcular: </h2>
        <header className="flex gap-2">
          <Button
            className="bg-yellow-500 text-yellow-800 hover:bg-yellow-600 text-sm w-fit py-0 h-min rounded-xl gap-1"
            onClick={() => {
              setCurrentCalculus("time");
            }}
          >
            Tiempo <ClockIcon />
          </Button>

          <Button
            className="bg-orange-500 text-orange-800 hover:bg-orange-600 text-sm w-fit py-0 h-min rounded-xl gap-1"
            onClick={() => {
              setCurrentCalculus("milk");
            }}
          >
            Leche <MilkIcon fill="white" color="black" />
          </Button>
          <Button
            className="bg-amber-200  text-amber-600 hover:bg-amber-300 text-sm w-fit py-0 h-min rounded-xl gap-1"
            onClick={() => {
              setCurrentCalculus("kefir_s");
            }}
          >
            Cucharadas <Image src="/spoons.svg" width={24} height={24} alt="" />
          </Button>
          <Button
            className="bg-red-200  text-red-600 hover:bg-red-300 text-sm w-fit py-0 h-min rounded-xl gap-1"
            onClick={() => {
              setCurrentCalculus("temperature");
            }}
          >
            Temperatura <ThermometerIcon className="text-gray-700" />
          </Button>
        </header>
        <div hidden={currentCalculus === "milk"}>
          <Label htmlFor="milk">Cantidad de leche (en litros)</Label>
          <Input
            type="number"
            id="milk"
            placeholder="0.5"
            onChange={(e) => setMilkVolume(parseInt(e.target.value))}
          />
        </div>
        <div hidden={currentCalculus === "temperature"}>
          <Label htmlFor="temperature">Temperatura (°C):</Label>
          <Input
            type="number"
            id="temperature"
            placeholder="22"
            onChange={(e) => setTemperature(parseInt(e.target.value))}
          />
        </div>
        <div hidden={currentCalculus === "kefir_s"}>
          <Label htmlFor="kefir">Cucharadas de kefir (100g c/u):</Label>
          <Input
            type="number"
            id="kefir"
            placeholder="2"
            onChange={(e) => setKefirGrains(parseInt(e.target.value))}
          />
        </div>
        <div hidden={currentCalculus === "time"}>
          <Label htmlFor="time">Tiempo de fermentación (horas):</Label>
          <Input
            type="number"
            id="time"
            placeholder="24"
            onChange={(e) => setFermentationTime(parseInt(e.target.value))}
          />
        </div>
        <Button
          onClick={() => {
            handleCalculate();
          }}
        >
          Calcular
        </Button>
        {result && (
          <div>
            <h2>Resultados</h2>
            <h1>
              Para que salga un kéfir rico a {temperature} grados con{" "}
              {kefirGrains} cucharadas y {milkVolume} litros de leche tendrias
              que dejarlo {result} fermentandose.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default KefirCalculator;
