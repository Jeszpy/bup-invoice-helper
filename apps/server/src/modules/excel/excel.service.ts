import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelService {
  create(createExcelDto: any) {
    return 'This action adds a new excel';
  }


}
