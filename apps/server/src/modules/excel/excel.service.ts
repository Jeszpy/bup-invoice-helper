import {Injectable, OnModuleInit} from '@nestjs/common';
import {CreateInvoiceDto} from "../invoices/dto/create-invoice.dto";
import path from "path";
import ExcelJS from 'exceljs'
import {randomUUID} from 'crypto';
import {rubles} from 'rubles'
import {createReadStream} from 'fs'
import * as stream from "stream";

@Injectable()
export class ExcelService {
    private resourcesPathPrefix: string = '../../../../../resources'
    private pathToTemplate: string = path.join(__dirname, `${this.resourcesPathPrefix}/template.xlsx`)
    private pathToExcelFolder: string = path.join(__dirname, `${this.resourcesPathPrefix}/excel/`)


    constructor() {
    }

    async create(createInvoiceDto: CreateInvoiceDto) {
        const date = new Date()
        const workbook: ExcelJS.Workbook = new ExcelJS.Workbook()
        await workbook.xlsx.readFile(this.pathToTemplate)
        const worksheet = workbook.getWorksheet(1)

        const titleCell = worksheet.getCell('A2')
        //TODO: number???
        titleCell.value = `Счёт-факрута №${randomUUID()}`

        const dateCell = worksheet.getCell('A4')
        dateCell.value = `${date.toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'}).replace(' г.', 'г.')}`

        const customerCell = worksheet.getCell('C9')
        customerCell.value = `${createInvoiceDto.title}, ${createInvoiceDto.requisites}`

        const cardsCountCell = worksheet.getCell('D15')
        cardsCountCell.value = createInvoiceDto.cardsCount

        const oneCardPriceWithoutVATCell = worksheet.getCell('F15')
        oneCardPriceWithoutVATCell.value = createInvoiceDto.cardsPrice

        const cardsPriceWithoutVATCell = worksheet.getCell('G15')
        cardsPriceWithoutVATCell.value = cardsCountCell.value * oneCardPriceWithoutVATCell.value

        const sumOfVATCell = worksheet.getCell('I15')
        sumOfVATCell.value = cardsPriceWithoutVATCell.value * 0.2

        const totalPriceCell = worksheet.getCell('J15')
        totalPriceCell.value = cardsPriceWithoutVATCell.value + sumOfVATCell.value

        const resultTotalPriceCell = worksheet.getCell('J16')
        resultTotalPriceCell.value = totalPriceCell.value

        const resultTotalVATCell = worksheet.getCell('J17')
        resultTotalVATCell.value = sumOfVATCell.value

        const totalPriceToStringCell = worksheet.getCell('C19')
        totalPriceToStringCell.value = rubles(resultTotalPriceCell.value)

        const totalVATToStringCell = worksheet.getCell('C20')
        totalVATToStringCell.value = rubles(resultTotalVATCell.value)

        const saveFilePath = this.pathToExcelFolder + titleCell.value + '.xlsx'
        await workbook.xlsx.writeFile(saveFilePath)
        return saveFilePath
    }


}
