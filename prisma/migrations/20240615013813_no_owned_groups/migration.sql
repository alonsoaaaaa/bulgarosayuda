/*
  Warnings:

  - You are about to drop the column `municipality` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `image` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_ownerId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "municipality",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "image" TEXT NOT NULL;
