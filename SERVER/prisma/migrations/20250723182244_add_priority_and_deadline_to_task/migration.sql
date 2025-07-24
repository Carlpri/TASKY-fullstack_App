-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('VERY_URGENT', 'URGENT', 'IMPORTANT');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'IMPORTANT';
