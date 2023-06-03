import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    userId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Bench Press"})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Lie on a bench and press a barbell"})
    description: string;
}
