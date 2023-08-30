import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('create-invoice')
  @HttpCode(HttpStatus.CREATED)
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { fileName, pdfFilePath } = await this.invoicesService.create(
      createInvoiceDto,
    );
    console.log('controller before send');
    const file = createReadStream(pdfFilePath);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${
        fileName.split('№')[1]
      }.pdf"`,
    });
    return new StreamableFile(file);
  }
}
