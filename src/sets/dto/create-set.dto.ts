import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateSetDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "abcdefg"})
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    exerciseId: number;

    @Min(1)
    @Max(100)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    repetitions: number;

    @Min(0)
    @Max(500)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    weight_kg: number;
}
