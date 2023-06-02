import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, Max, MaxDate, Min } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "John"})
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Doe"})
    last_name: string;

    @IsIn(["male" , "female" , "other"])
    @IsNotEmpty()
    @ApiProperty({example: "male"})
    gender: "male" | "female" | "other";

    @Type(() => Date)
    @MaxDate(new Date())
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: "1990-01-01T00:00:00Z"})
    birthday: Date;

    @Min(30)
    @Max(150)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 30.0})
    current_weight_kg: number;

    @Min(100)
    @Max(250)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 180.0})
    height_cm: number; 

    @IsEmail()
    @ApiProperty({example: "example@email.com"})
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    provider_UID: string;
}
