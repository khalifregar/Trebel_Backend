import { IsMongoId, IsArray, ArrayNotEmpty } from 'class-validator';

export class UserPlaylistDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  playlistIds: string[];
}



export class PlaylistOptionDto {
    id: string;
    name: string;
    imageUrl: string;
  }
  
