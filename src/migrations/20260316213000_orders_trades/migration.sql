/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_buyOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_sellOrderId_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Trade";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "btc" DECIMAL(18,8) NOT NULL DEFAULT 100,
    "usd" DECIMAL(18,8) NOT NULL DEFAULT 100000,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "type" "OrderType" NOT NULL,
    "price" DECIMAL(18,8) NOT NULL,
    "amount" DECIMAL(18,8) NOT NULL,
    "remaining" DECIMAL(18,8) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades" (
    "id" UUID NOT NULL,
    "price" DECIMAL(18,8) NOT NULL,
    "amount" DECIMAL(18,8) NOT NULL,
    "buy_order_id" UUID NOT NULL,
    "sell_order_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE INDEX "orders_type_status_price_created_at_idx" ON "orders"("type", "status", "price", "created_at");

-- CreateIndex
CREATE INDEX "orders_user_id_status_idx" ON "orders"("user_id", "status");

-- CreateIndex
CREATE INDEX "trades_created_at_idx" ON "trades"("created_at");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_buy_order_id_fkey" FOREIGN KEY ("buy_order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_sell_order_id_fkey" FOREIGN KEY ("sell_order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
