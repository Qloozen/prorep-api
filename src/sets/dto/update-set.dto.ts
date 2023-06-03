import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSetDto } from './create-set.dto';

export class UpdateSetDto extends PartialType(OmitType(CreateSetDto, ["userId", "exerciseId"])) {}
