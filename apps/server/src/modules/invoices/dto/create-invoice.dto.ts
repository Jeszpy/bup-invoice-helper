import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  title: string;

  @IsString()
  requisites: string;

  @IsBoolean()
  isSend: boolean;

  @IsEmail()
  @IsOptional()
  email: string;

  @Min(1)
  @IsInt()
  cardsCount: number;

  @Min(0.1)
  cardsPrice: number;
}
