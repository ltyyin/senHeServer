-- CreateTable
CREATE TABLE `users-channel` (
    `id` VARCHAR(191) NOT NULL,
    `name` CHAR(40) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users-channel` ADD CONSTRAINT `users-channel_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users-account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
