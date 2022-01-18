-- CreateTable
CREATE TABLE `articles` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(255) NULL,
    `category` VARCHAR(191) NOT NULL,
    `comm_count` SMALLINT NOT NULL DEFAULT 0,
    `browse_count` INTEGER NOT NULL DEFAULT 0,
    `is_top` TINYINT NOT NULL DEFAULT 0,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `pubdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `channelID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
