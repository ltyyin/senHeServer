/*
  Warnings:

  - The primary key for the `users-channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `users-channel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users-channel` DROP PRIMARY KEY;

-- CreateTable
CREATE TABLE `AllChannel` (
    `id` VARCHAR(191) NOT NULL,
    `name` CHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users-channel_id_key` ON `users-channel`(`id`);
