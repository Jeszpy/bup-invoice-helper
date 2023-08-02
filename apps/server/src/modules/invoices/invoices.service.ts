import {Injectable, OnModuleInit} from '@nestjs/common';
import {CreateInvoiceDto} from './dto/create-invoice.dto';
import {ExcelService} from "../excel/excel.service";
import {PdfService} from "../pdf/pdf.service";
import  fs from "fs";
import  path from "path";

@Injectable()
export class InvoicesService implements OnModuleInit{
    constructor(private readonly excelService: ExcelService, private readonly pdfService: PdfService) {
    }

    onModuleInit(): any {

        console.log()
    }

    async create(createInvoiceDto: CreateInvoiceDto) {
        const fileName = '123.txt'
        const pathToFile = path.join( __dirname, `../../../../../resources/${fileName}`)
        const stream = fs.createReadStream(pathToFile)
        return stream
    }

}
