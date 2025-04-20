import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true })
  name: string;

  @Prop()
  imageUrl: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
