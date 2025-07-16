import { IsString, IsNotEmpty, IsNumber, IsOptional, IsMongoId, IsBoolean } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  category: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
