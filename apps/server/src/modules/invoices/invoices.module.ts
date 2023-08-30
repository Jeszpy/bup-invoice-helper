import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ExcelModule } from '../excel/excel.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [ExcelModule, PdfModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
