import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Soundtrack {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  duration: number; // in seconds

  @Prop({ required: true })
  audioUrl: string;

  @Prop({ required: true })
  coverUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Playlist', required: true })
  playlistId: Types.ObjectId;

  @Prop({ default: 0 })
  playCount: number; // ✅ jumlah diputar
}

export type SoundtrackDocument = Soundtrack & Document;
export const SoundtrackSchema = SchemaFactory.createForClass(Soundtrack);
