-- CreateTable
CREATE TABLE `users-account` (
    `id` VARCHAR(191) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `users-account_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users-password` (
    `salt` CHAR(5) NOT NULL,
    `password` CHAR(25) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users-password_salt_key`(`salt`),
    UNIQUE INDEX `users-password_userID_key`(`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users-password` ADD CONSTRAINT `users-password_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users-account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
