import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import process from "process";
import path from "path";
import fs from 'fs/promises'
import unzipper from 'unzipper'
import {ConfigService} from "@nestjs/config";
import {EnvEnum} from "../../enums/env.enum";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
    private logger: Logger = new Logger(BootstrapService.name)
    private readonly pathToResources = path.join(process.cwd(), '../../resources')
    private readonly pathToExcelFolder = this.pathToResources + '/excel'
    private readonly pathToPdfFolder = this.pathToResources + '/pdf'
    private readonly zipFilePath = this.pathToResources + '/template.zip'
    private readonly xlsxTemplateFilePath = this.pathToResources + '/template.xlsx'

    constructor(private readonly configService: ConfigService) {
    }

    private startLog(name: string) {
        this.logger.verbose(`Start execution of the '${name}' method`)
    }

    private finishLog(name: string) {
        this.logger.verbose(`'${name}' method execution completed without errors`)
    }

    private errorLog(name: string, error: any) {
        this.logger.error(`An error occurred while executing the ${name} method`, error)
    }

    private async createFolders(paths: string[]) {
        try {
            this.startLog(this.createFolders.name)
            for (const folder of paths) {
                await fs.mkdir(folder, {recursive: true})
            }
            this.finishLog(this.createFolders.name)
        } catch (e) {
            this.errorLog(this.createFolders.name, e)
            throw new Error(e)
        }
    }

    private async unzipXlsxTemplate() {
        try {
            this.startLog(this.unzipXlsxTemplate.name)
            const directory = await unzipper.Open.file(this.zipFilePath)
            const file = directory.files[0]
            const extracted = await file.buffer(this.configService.getOrThrow(EnvEnum.ZIP_PASSWORD))
            await fs.writeFile(this.xlsxTemplateFilePath, extracted)
            this.finishLog(this.unzipXlsxTemplate.name)
        } catch (e) {
            this.errorLog(this.unzipXlsxTemplate.name, e)
            throw new Error(e)
        }

    }

    async onApplicationBootstrap() {
        try {
            await this.createFolders([this.pathToExcelFolder, this.pathToPdfFolder])
            await this.unzipXlsxTemplate()
        } catch (e) {
            throw new Error(e)
        }
    }

}
