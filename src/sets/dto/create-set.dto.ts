import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateSetDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    userId: number;

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
