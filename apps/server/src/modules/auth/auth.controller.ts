import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    public login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Post('refreshToken')
    @HttpCode(HttpStatus.CREATED)
    public refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ token: string }> {
        return this.authService.refreshToken(refreshTokenDto);
    }

}
