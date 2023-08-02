import {Body, Controller, Header, HttpCode, HttpStatus, Post, StreamableFile} from '@nestjs/common';
import {InvoicesService} from './invoices.service';
import {CreateInvoiceDto} from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}


  @Post('create-invoice')
  @Header('Content-Type', 'application/text')
  @HttpCode(HttpStatus.CREATED)
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<StreamableFile> {
    const file = await this.invoicesService.create(createInvoiceDto);
    return new StreamableFile(file)
  }
}
