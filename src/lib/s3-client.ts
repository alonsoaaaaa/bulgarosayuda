import { S3 } from "@aws-sdk/client-s3";

const endpoint = "https://nyc3.digitaloceanspaces.com";
// const accessKeyId = process.env.NEXT_PUBLIC_DIGITALOCEAN_SPACES_AK;
// const secretAccessKey = process.env.NEXT_PUBLIC_DIGITALOCEAN_SPACES_SK;
const region = "us-east-1"; // Ensure this matches your Space's region
// console.log(accessKeyId);
// console.log(secretAccessKey);
const s3Client = new S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SECRET_KEY || "",
  },
});
export default s3Client;
