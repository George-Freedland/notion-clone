-- CreateEnum
CREATE TYPE "TextType" AS ENUM ('H1', 'H2', 'H3', 'PARAGRAPH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageTextItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "TextType" NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "PageTextItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageImageItem" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "PageImageItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTextItem" ADD CONSTRAINT "PageTextItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageImageItem" ADD CONSTRAINT "PageImageItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
