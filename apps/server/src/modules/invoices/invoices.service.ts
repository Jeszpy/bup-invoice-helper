import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ExcelService } from '../excel/excel.service';
import { PdfService } from '../pdf/pdf.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ISendEmailEvent } from '../notifications/email-notifications.service';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly excelService: ExcelService,
    private readonly pdfService: PdfService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    console.log(createInvoiceDto);
    const { fileName, excelFilePath } = await this.excelService.create(
      createInvoiceDto,
    );
    const { pdfFilePath } = await this.pdfService.convertXlsxToPdf(
      fileName,
      excelFilePath,
    );
    const eventPayload: ISendEmailEvent = {
      email: createInvoiceDto.isSend ? createInvoiceDto.email : null,
      pathToInvoice: pdfFilePath,
      fileName,
    };
    this.eventEmitter.emit('invoice.created', eventPayload);
    return { fileName, pdfFilePath };
  }
}
