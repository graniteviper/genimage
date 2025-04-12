-- AddForeignKey
ALTER TABLE "packPrompts" ADD CONSTRAINT "packPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
