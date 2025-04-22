import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CreateMessage {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
