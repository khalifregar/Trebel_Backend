import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserPlaylistDocument = UserPlaylist & Document;

@Schema({ timestamps: true })
export class UserPlaylist {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Playlist', required: true })
  playlistIds: Types.ObjectId[];
}

export const UserPlaylistSchema = SchemaFactory.createForClass(UserPlaylist);
