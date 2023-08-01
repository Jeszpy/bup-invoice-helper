import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {ConfigService} from "@nestjs/config";
import {EnvEnum} from "../../enums/env.enum";
import {JwtService} from "@nestjs/jwt";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {
    private readonly SA_PWD: string
    private readonly logger: Logger = new Logger(AuthService.name)

    constructor(configService: ConfigService, private readonly jwtService: JwtService) {
        this.SA_PWD = configService.get(EnvEnum.SA_PWD)
    }

    public async login(loginDto: LoginDto): Promise<{ token: string }> {
        try {
            if (loginDto.password !== this.SA_PWD) throw new UnauthorizedException()
            const token: string = await this.jwtService.signAsync({})
            return {token}
        } catch (e) {
            throw new UnauthorizedException()
        }
    }

    public async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ token: string }> {
        try {
            await this.jwtService.verifyAsync(refreshTokenDto.token)
            const token = await this.jwtService.signAsync({})
            return {token}
        } catch (e) {
            throw new UnauthorizedException()
        }

    }


}
