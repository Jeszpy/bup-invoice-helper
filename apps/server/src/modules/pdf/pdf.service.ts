import { Injectable } from '@nestjs/common';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import CloudmersiveConvertApiClient from 'cloudmersive-convert-api-client';
import fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from '../../enums/env.enum';

@Injectable()
export class PdfService {
  constructor(private readonly cfgService: ConfigService) {}
  private readonly resourcesPathPrefix: string = '../../../../../resources';
  private readonly pathToExcelFolder: string = path.join(
    __dirname,
    `${this.resourcesPathPrefix}/excel/`,
  );
  private readonly pathToPdfFolder: string = path.join(
    __dirname,
    `${this.resourcesPathPrefix}/pdf/`,
  );

  async convertXlsxToPdf(
    fileName: string,
    filePath: string,
  ): Promise<{ pdfFilePath: string }> {
    const inputBuff = await fs.readFile(filePath);
    const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
    const Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = this.cfgService.get(EnvEnum.CLOUDMERSIVE_CONVERT_API_KEY);
    const api = new CloudmersiveConvertApiClient.ConvertDocumentApi();
    const res = await api.convertDocumentXlsxToPdf(
      Buffer.from(inputBuff.buffer),
    );
    const pdfFilePath = path.join(this.pathToPdfFolder, `${fileName}.pdf`);
    await fs.writeFile(pdfFilePath, res.body);

    return { pdfFilePath };
  }
}
