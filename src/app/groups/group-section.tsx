import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const GroupSection = ({ stateInfo }: any) => {
  return (
    <div className="flex max-w-[1100px] gap-1 flex-wrap justify-center">
      {stateInfo.map((stateinf: any) => (
        <Card
          className="flex flex-col justify-between w-[350px] border border-yellow-400"
          key={stateinf.state}
        >
          <CardHeader className="flex text-center">
            <CardTitle className="text-gray-600">{stateinf.state}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              className="w-full h-40 object-cover rounded-md"
              width={350}
              height={200}
              src={stateinf.image}
              alt={stateinf.state}
            />
          </CardContent>
          <CardFooter className="justify-center">
            <Link href={`/groups/${stateinf.id}`}>
              <Button className="bg-yellow-600 hover:bg-yellow-500 self-center">
                Ver estado
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GroupSection;
