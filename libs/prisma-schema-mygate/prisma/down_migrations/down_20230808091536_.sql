-- DropForeignKey
ALTER TABLE "i_am_here_logs" DROP CONSTRAINT "i_am_here_logs_device_id_fkey";

-- DropForeignKey
ALTER TABLE "sync_ack_logs" DROP CONSTRAINT "sync_ack_logs_device_id_fkey";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "device_key";

-- DropTable
DROP TABLE "i_am_here_logs";

-- DropTable
DROP TABLE "sync_ack_logs";

