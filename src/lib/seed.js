import { cities } from "./data.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  cities.map((city) => {
    city.locations.map(async (location) => {
      await prisma.group.create({
        data: {
          location: location,
          state: city.state,
        },
      });
    });
  });
}
// main();
