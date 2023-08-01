import {Injectable} from "@nestjs/common";
import {JwtModuleOptions, JwtOptionsFactory} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {EnvEnum} from "../enums/env.enum";


@Injectable()
export class JwtModuleConfig implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }

    createJwtOptions (): JwtModuleOptions {
        return {
            secret: this.configService.get(EnvEnum.JWT_SECRET),
            signOptions: {
                expiresIn: this.configService.get(EnvEnum.JWT_EXPIRES_IN)
            },
            verifyOptions: {
                ignoreExpiration: false
            }
        };
    }
}