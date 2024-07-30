/*
  Warnings:

  - You are about to drop the `TaskFieldInt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskFieldStr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskFieldInt" DROP CONSTRAINT "TaskFieldInt_taskFieldId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFieldInt" DROP CONSTRAINT "TaskFieldInt_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFieldStr" DROP CONSTRAINT "TaskFieldStr_taskFieldId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFieldStr" DROP CONSTRAINT "TaskFieldStr_taskId_fkey";

-- DropTable
DROP TABLE "TaskFieldInt";

-- DropTable
DROP TABLE "TaskFieldStr";
