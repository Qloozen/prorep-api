import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;

    @IsIn(["male" , "female" , "other"])
    @IsNotEmpty()
    @ApiProperty()
    gender: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    birthday: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    current_weight_kg: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    height_cm: number; 

    @IsEmail()
    @ApiProperty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    provider_UID: string;
}
