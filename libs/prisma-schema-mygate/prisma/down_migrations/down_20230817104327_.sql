-- DropForeignKey
ALTER TABLE "mygate_cards" DROP CONSTRAINT "mygate_cards_device_id_fkey";

-- DropForeignKey
ALTER TABLE "sync_message_cards" DROP CONSTRAINT "sync_message_cards_sync_message_id_fkey";

-- DropForeignKey
ALTER TABLE "device_cards" DROP CONSTRAINT "device_cards_device_id_fkey";

-- DropIndex
DROP INDEX "mygate_cards_device_id_access_ref_id_key";

-- DropIndex
DROP INDEX "sync_messages_device_id_sync_token_key";

-- DropIndex
DROP INDEX "device_cards_device_id_card_id_key";

-- AlterTable
ALTER TABLE "mygate_cards" ALTER COLUMN "device_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sync_messages" DROP COLUMN "sync_token",
ADD COLUMN     "sync_token" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "device_cards" DROP COLUMN "card_id",
ADD COLUMN     "access_display" TEXT NOT NULL;

-- DropTable
DROP TABLE "sync_message_cards";

-- DropEnum
DROP TYPE "SyncMessageCardAction";

-- CreateTable
CREATE TABLE "s_m_cards" (
    "id" SERIAL NOT NULL,
    "s_m_id" INTEGER NOT NULL,
    "access_display" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "s_m_cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mygate_cards" ADD CONSTRAINT "mygate_cards_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("device_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s_m_cards" ADD CONSTRAINT "s_m_cards_s_m_id_fkey" FOREIGN KEY ("s_m_id") REFERENCES "sync_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

