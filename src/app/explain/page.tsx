"use client";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createNonStreamingMultipartContent } from "@/actions";
import { createImageUrl, convertToBase64 } from "@/lib/utils";
import { PointerIcon } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";
async function getSession() {
  let session = await auth();
  return session;
}

function ExplainPage() {
  let [img, setImg] = useState<File>();
  let [imageUrl, setImageUrl] = useState(null);
  let [explanation, setExplanation] = useState("");
  let [session, setSession] = useState<any>(null);
  useEffect(() => {
    // Call getSession and store the result in the session state variable
    getSession().then(setSession).catch(console.error);
  }, []); // Emp
  let formatedExp = useRef([]);
  formatedExp.current = explanation.split("- **") as any;
  console.log(formatedExp.current);

  let onSubmit = async (e: any) => {
    e.preventDefault();
    if (!img) return;
    let imgUrl = await createImageUrl(img);
    setImageUrl(imgUrl);
    console.log("IMAGE URL", imgUrl);

    let encodedImg = await convertToBase64(img);
    let explanation = await createNonStreamingMultipartContent(
      encodedImg as string
    );
    if (!explanation) return;
    setExplanation(explanation);
  };
  return (
    <>
      <Navbar />
      {session !== null ? (
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col justify-center content-center items-center mt-5 gap-3"
        >
          <div className="flex gap-3 justify-center items-center pr-32">
            <div className="flex gap-3">
              <h1 className="font-serif">Seleccionar imágen</h1>
              <PointerIcon className="rotate-90" />
            </div>
            <Input
              type="file"
              accept="image/jpg, image/jpeg"
              name="file"
              onChange={(e) => {
                setImg(e.target.files?.[0]);
              }}
              required
              className="w-fit"
            />
          </div>

          <Input
            className="bg-blue-300 w-fit"
            type="submit"
            value="Subir imágen"
          />
        </form>
      ) : (
        <h1 className="text-center text-lg pt-5 font-mono">
          {" "}
          Logueate para subir imágenes
        </h1>
      )}
      {imageUrl != null && (
        <div className="flex flex-col justify-center items-center mt-5">
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt=""
            className="rounded-lg"
          />
          <div className="flex-col items-start text-start content-start">
            {formatedExp.current.map((item: string) => {
              return (
                <p
                  key={item}
                  className="block font-semibold text-lg text-start"
                >
                  {item.replace(/-\s/g, "").replace(/\*\*/g, "")}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ExplainPage;