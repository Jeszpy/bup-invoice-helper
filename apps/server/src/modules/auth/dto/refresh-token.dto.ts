import {IsJWT, IsString} from "class-validator";


export class RefreshTokenDto {
    @IsJWT()
    @IsString()
    token: string
}