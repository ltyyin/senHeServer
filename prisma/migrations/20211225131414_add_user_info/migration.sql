-- CreateTable
CREATE TABLE `users-info` (
    `name` VARCHAR(191) NOT NULL,
    `photo` CHAR(255) NULL,
    `userID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users-info_name_key`(`name`),
    UNIQUE INDEX `users-info_userID_key`(`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users-info` ADD CONSTRAINT `users-info_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users-account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
