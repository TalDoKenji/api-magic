import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CardDTO } from './cards.dto';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  commander: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDTO)
  cards: CardDTO[];

  @IsString()
  @IsNotEmpty()
  userId: string;
}
