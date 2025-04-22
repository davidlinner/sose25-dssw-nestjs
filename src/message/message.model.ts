import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Message {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsLatitude()
  latitude?: number;
}

export class UpdateMessage extends Message {}
export class CreateMessage extends Message {}
