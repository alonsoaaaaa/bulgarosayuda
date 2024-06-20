"use client";
import React, { useRef, useState } from "react";
import Navbar from "@/components/navbar";
import { cities } from "@/lib/data";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function GroupsByState() {
  const { id } = useParams();
  const cityObj = cities.find((city) => city.id === parseInt(id as string));
  const cityName = cityObj?.state || "No encontrado";
  const cityStateObj = cities.filter((city) => city.state === cityName);
  const cityLocations = cityStateObj[0].locations;
  const [currentLocations, setCurrentLocations] = useState(cityLocations);
  let locationRef = useRef("");
  let newCurrentLocations: any = [];
  debugger;
  const handleInput = (e: any) => {
    locationRef.current = e.target.value;
    newCurrentLocations = cityLocations.filter((location) => {
      return locationRef.current == null || locationRef.current === ""
        ? true
        : location
            .toLocaleLowerCase()
            .includes(locationRef.current.toLocaleLowerCase());
    });
    setCurrentLocations(newCurrentLocations);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-mono">Grupos de {cityName}</h1>
        <h2 className="flex items-center">
          <p className=" text-xl">Estoy en:</p>{" "}
          <Input className="border border-fuchsia-400" onInput={handleInput} />
        </h2>
        {currentLocations.map((location) => (
          <Card
            className="flex flex-col justify-between w-[350px] border border-yellow-400"
            key={location}
          >
            <CardHeader className="flex text-center">
              <CardTitle className="text-gray-600">{location}</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Comparte conocimientos con gente cercana a ti!</h1>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href={`/groups/1/1`}>
                <Button className="bg-yellow-600 hover:bg-yellow-500 self-center">
                  Ver Grupo
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
export default GroupsByState;
