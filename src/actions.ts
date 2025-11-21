"use server";

import {
  VertexAI,
  GenerateContentRequest,
  Part,
  FileDataPart,
} from "@google-cloud/vertexai";
import fs from "fs";
import path from "path";
export async function createNonStreamingMultipartContent(
  base64Image: string,
  projectId = "ornate-ray-424712-r8",
  location = "us-central1",
  model = "gemini-1.5-pro-001",
  mimeType = "image/jpeg"
) {
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credentialsJson) {
    throw new Error("Google credentials not configured");
  }

  const tempFilePath = path.join("/tmp", "google-credentials.json");
  fs.writeFileSync(tempFilePath, credentialsJson);

  console.log("base64 IMAGE ", base64Image);
  const base64Data = base64Image.replace(
    /^data:image\/(?:jpg|jpeg);base64,/,
    ""
  );

  const vertexAI = new VertexAI({
    project: projectId,
    location: location,
    googleAuthOptions: {
      keyFilename: tempFilePath,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    },
  });

  // Instantiate the model
  const generativeVisionModel = vertexAI.getGenerativeModel({
    model: model,
    generationConfig: {
      temperature: 0,
    },
    systemInstruction:
      "Eres una experta fermentadora de kéfir que solo habla español. Entrada: <Imagen de gránulos de kéfir> Tarea: Analiza la imagen de los gránulos de kéfir y genera una respuesta detallada sobre su estado. Tu respuesta debe incluir:- Si los gránulos parecen estar podridos o no, explicando los signos visuales que te llevan a esa conclusión (como cambios de color, presencia de moho, etc.). - Si los gránulos parecen estar sanos y en buen estado, describiendo su aspecto esperado. - Cualquier otro detalle relevante que puedas observar, como la textura, tamaño o forma de los gránulos. - Recomendaciones sobre si es seguro consumir esos gránulos según tu análisis o si sería mejor desecharlos.Tu respuesta debe ser detallada y basada únicamente en la información visual que puedas extraer de la imagen. No hagas suposiciones más allá de lo que se puede observar claramente. Salida: <Respuesta detallada sobre el estado de los gránulos de kéfir en la imagen>",
  });
  let a: GenerateContentRequest;
  // For images, the SDK supports both Google Cloud Storage URI and base64 strings
  const filePart = { inlineData: { data: base64Data, mimeType: mimeType } };
  const textPart = {
    text: "Analiza la imagen",
  };
  const request = {
    contents: [{ role: "user", parts: [filePart, textPart] as Part[] }],
  };
  const streamingResult = await generativeVisionModel.generateContentStream(
    request
  );
  const contentResponse = await streamingResult.response;
  return contentResponse?.candidates![0].content.parts[0]?.text!;
}
