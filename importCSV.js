import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function importCSV() {
  const results = [];

  fs.createReadStream("GeneralistRails_Project_MessageData.csv")
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", async () => {
      try {
        for (const row of results) {
          const userId = parseInt(row["User ID"]);
          const timestamp = new Date(row["Timestamp (UTC)"]);
          const messageBody = row["Message Body"];

          // Upsert customer
          await prisma.customer.upsert({
            where: { userId },
            update: {},
            create: { userId },
          });

          // Insert message
          await prisma.message.create({
            data: {
              userId,
              timestamp,
              messageBody,
            },
          });
        }

        console.log("✅ CSV data imported successfully!");
      } catch (err) {
        console.error("❌ Error importing data:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

importCSV();
