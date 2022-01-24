/*
  Warnings:

  - You are about to alter the column `comm_count` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `UnsignedInt`.
  - You are about to alter the column `browse_count` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `like_count` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the column `id` on the `users-channel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users-channel` table. All the data in the column will be lost.
  - You are about to drop the `allchannel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelID` to the `users-channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users-channel_id_key` ON `users-channel`;

-- AlterTable
ALTER TABLE `articles` MODIFY `comm_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    MODIFY `browse_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    MODIFY `like_count` INTEGER UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users-channel` DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `channelID` VARCHAR(191) NOT NULL,
    ADD COLUMN `pubdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NULL,
    ADD PRIMARY KEY (`channelID`, `userID`);

-- DropTable
DROP TABLE `allchannel`;

-- CreateTable
CREATE TABLE `all-channel` (
    `id` VARCHAR(191) NOT NULL,
    `name` CHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users-channel` ADD CONSTRAINT `users-channel_channelID_fkey` FOREIGN KEY (`channelID`) REFERENCES `all-channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
