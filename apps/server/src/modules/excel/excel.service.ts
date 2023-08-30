import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../invoices/dto/create-invoice.dto';
import path from 'path';
import ExcelJS from 'exceljs';
import { rubles } from 'rubles';

@Injectable()
export class ExcelService {
  private resourcesPathPrefix = '../../../../../resources';
  private pathToTemplate: string = path.join(
    __dirname,
    `${this.resourcesPathPrefix}/template.xlsx`,
  );
  private pathToExcelFolder: string = path.join(
    __dirname,
    `${this.resourcesPathPrefix}/excel/`,
  );

  constructor() {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<{ fileName: string; excelFilePath: string }> {
    const date = new Date();
    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.pathToTemplate);
    const worksheet = workbook.getWorksheet(1);

    const titleCell = worksheet.getCell('A2');
    titleCell.value = `Счёт-фактура №${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const dateCell = worksheet.getCell('A4');
    dateCell.value = `${date
      .toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
      .replace(' г.', 'г.')}`;

    const customerCell = worksheet.getCell('C9');
    customerCell.value = `${createInvoiceDto.title}, ${createInvoiceDto.requisites}`;

    const cardsCountCell = worksheet.getCell('D15');
    cardsCountCell.value = createInvoiceDto.cardsCount;

    const oneCardPriceWithoutVATCell = worksheet.getCell('F15');
    oneCardPriceWithoutVATCell.value = createInvoiceDto.cardsPrice;

    const cardsPriceWithoutVATCell = worksheet.getCell('G15');
    cardsPriceWithoutVATCell.value =
      cardsCountCell.value * oneCardPriceWithoutVATCell.value;

    const sumOfVATCell = worksheet.getCell('I15');
    sumOfVATCell.value = cardsPriceWithoutVATCell.value * 0.2;

    const totalPriceCell = worksheet.getCell('J15');
    totalPriceCell.value = cardsPriceWithoutVATCell.value + sumOfVATCell.value;

    const resultTotalPriceCell = worksheet.getCell('J16');
    resultTotalPriceCell.value = totalPriceCell.value;

    const resultTotalVATCell = worksheet.getCell('J18');
    resultTotalVATCell.value = sumOfVATCell.value;

    const totalPriceToStringCell = worksheet.getCell('C19');
    totalPriceToStringCell.value = rubles(resultTotalPriceCell.value);

    const totalVATToStringCell = worksheet.getCell('C20');
    totalVATToStringCell.value = rubles(resultTotalVATCell.value);

    const saveFilePath = this.pathToExcelFolder + titleCell.value + '.xlsx';
    await workbook.xlsx.writeFile(saveFilePath);
    return { fileName: titleCell.value, excelFilePath: saveFilePath };
  }
}
