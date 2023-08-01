import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtModuleConfig} from "../../configs/jwt-module.config";

@Module({
    imports: [JwtModule.registerAsync({useClass: JwtModuleConfig})],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
