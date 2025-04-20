import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Soundtrack, SoundtrackDocument } from './entities/soundtrack.entity';

@Injectable()
export class SoundtrackSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Soundtrack.name)
    private soundtrackModel: Model<SoundtrackDocument>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.soundtrackModel.countDocuments();
    if (count === 0) {
      const playlistId = new Types.ObjectId('6623df0f6bdc58f6f2a44a2e'); // ganti dengan id playlist kamu
      await this.soundtrackModel.insertMany([
        {
          title: 'Rainy Mood',
          artist: 'Pamungkas',
          duration: 210,
          audioUrl: 'https://domain.com/audio/rainy.mp3',
          coverUrl: 'https://placehold.co/600x400?text=Rainy',
          playlistId,
        },
        {
          title: 'Sunshine Chill',
          artist: 'Nadin Amizah',
          duration: 180,
          audioUrl: 'https://domain.com/audio/sunshine.mp3',
          coverUrl: 'https://placehold.co/600x400?text=Sunshine',
          playlistId,
        },
        // tambahin lagu lain sesuka hati 😎
      ]);
    }
  }
}
