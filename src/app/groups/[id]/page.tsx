"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import cities from "@/lib/data";
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
  const { id } = useParams<LocationParams>();
  const cityObj = cities.find((city) => city.id === Number(id));
  const cityName = cityObj?.state || "No encontrado";
  const cityStateObj = cities.filter((city) => city.state === cityName);
  const cityLocations: LocationInformation[] = cityStateObj[0].locations;
  const [currentLocations, setCurrentLocations] = useState(cityLocations);
  let locationQueryRef = useRef("");
  let newCurrentLocations: LocationInformation[] = [];
  debugger;
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    locationQueryRef.current = e.target?.value;
    newCurrentLocations = cityLocations.filter((location) => {
      return locationQueryRef.current == null || locationQueryRef.current === ""
        ? true //list every location
        : location.name
            .toLocaleLowerCase()
            .includes(locationQueryRef.current.toLocaleLowerCase()); //current query is a substring of the current element?
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
            key={location.name}
          >
            <CardHeader className="flex text-center">
              <CardTitle className="text-gray-600">{location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Comparte conocimientos con gente cercana a ti!</h1>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href={location.link}>
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
