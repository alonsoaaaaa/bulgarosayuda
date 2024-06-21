import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
// import { S3 } from "@aws-sdk/client-s3";
// import s3Client from "./s3-client";
// import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
// import { v4 as uuid } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const prismaClientSingleton = () => {
  return new PrismaClient();
};
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV == "production") globalForPrisma.prisma = prisma;

type City = {
  state: string;
  locations: string[];
  image: string;
  id: number;
};

export function getStateNames(cities: City[]): string[] {
  return cities.map((city) => city.state);
}

export function getImages(cities: City[]): string[] {
  return cities.map((city) => city.image);
}

export function getStateInfo(cities: City[]) {
  return cities.map((city) => {
    return { state: city.state, image: city.image, id: city.id };
  });
}

export async function createImageUrl(image: any) {
  debugger;
  const formData = new FormData();
  // console.log("Imagen recibida en el createImageUrl: ", image);
  formData.append("image", image);
  const response = await fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const imgUrl = data.imageUrl;
  console.log("URL devuelto por la API route: ", imgUrl);
  return imgUrl;
}
export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    } else {
      throw Error;
    }
  });
};
//TODO: HOW TO CHANGE PNG AND JPG TO JPEG SO PEOPLE CAN UPLOAD IN THE FORMAT THWY WANT
