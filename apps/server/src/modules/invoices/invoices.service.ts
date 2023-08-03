import {Injectable, OnModuleInit} from '@nestjs/common';
import {CreateInvoiceDto} from './dto/create-invoice.dto';
import {ExcelService} from "../excel/excel.service";
import {PdfService} from "../pdf/pdf.service";
import  fs, { createReadStream } from "fs";
import  path from "path";

@Injectable()
export class InvoicesService {
    constructor(private readonly excelService: ExcelService, private readonly pdfService: PdfService) {
    }



    async create(createInvoiceDto: CreateInvoiceDto) {
        const excel = await this.excelService.create(createInvoiceDto)
        return createReadStream(excel)
    }

}
