import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  create(createPdfDto: any) {
    return 'This action adds a new pdf';
  }
}
