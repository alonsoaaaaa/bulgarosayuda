import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import s3Client from "@/lib/s3-client";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
// import AWS from "aws-sdk";
export async function POST(req: Request) {
  try {
    //NOTA: Por alguna razón el getAll no funciona, solo devuelve la ultima imagen agregada con append()
    const data = await req.formData();
    const image: File = data.get("image") as File;
    let imageDate = new Date().getDate(); //implementar el que despues de una timepo determinado se borren solas las imagenes
    let fileExtension = image.name.split(".").pop();
    let bytes = await image.arrayBuffer();
    let buffer = Buffer.from(bytes);
    if (!image) {
      return NextResponse.json({ message: "There is no image" });
    }
    if (image.size > 10000000) {
      return NextResponse.json({ message: "The image is too large" });
    }
    console.log(process.env.DO_ACCESS_KEY);
    console.log(process.env.DO_ACCESS_KEY);
    const bucketParams = {
      Bucket: "sabomotorsmedia",
      Key: `${image.name + "BA"}-${uuid()}.${fileExtension}`,
      Body: buffer,
      ACL: ObjectCannedACL.public_read,
    };
    const result = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(result);
    let url = `https://sabomotorsmedia.nyc3.digitaloceanspaces.com/${bucketParams.Key}`;
    console.log("POST URL", url);
    return NextResponse.json({
      imageUrl: url,
    });
  } catch (error) {
    console.error("Failed to upload image: ", error);
    return NextResponse.json({ message: "Failed to upload image" });
  }
}
