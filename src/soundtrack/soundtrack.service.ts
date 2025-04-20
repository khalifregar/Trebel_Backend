import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Soundtrack, SoundtrackDocument } from './entities/soundtrack.entity';
import { SoundtrackDto } from './dto/soundtrack.dto';

@Injectable()
export class SoundtrackService {
  constructor(
    @InjectModel(Soundtrack.name)
    private readonly soundtrackModel: Model<SoundtrackDocument>,
  ) {}

  async findByPlaylistId(playlistId: string): Promise<SoundtrackDto[]> {
    if (!Types.ObjectId.isValid(playlistId)) {
      throw new NotFoundException('Invalid playlist ID');
    }

    const tracks = await this.soundtrackModel
      .find({ playlistId: new Types.ObjectId(playlistId) })
      .sort({ createdAt: -1 })
      .lean();

    // Kalau pengen pakai exception
    if (!tracks.length) {
      throw new NotFoundException('No soundtracks found for this playlist');
    }

    return tracks.map((track) => ({
      id: track._id.toString(),
      title: track.title,
      artist: track.artist,
      duration: track.duration,
      audioUrl: track.audioUrl,
      coverUrl: track.coverUrl,
    }));
  }

  async incrementPlayCount(id: string): Promise<{ playCount: number }> {
    const updated = await this.soundtrackModel.findByIdAndUpdate(
      id,
      { $inc: { playCount: 1 } },
      { new: true }, // penting biar dapet doc baru
    );
  
    return { playCount: updated?.playCount ?? 0 };
  }
  
}
