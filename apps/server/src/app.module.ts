import {Module} from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {ConfigModule} from '@nestjs/config';
import Joi from "joi";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                SA_PWD: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required(),
            })
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'client', 'dist'),
        }),
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
