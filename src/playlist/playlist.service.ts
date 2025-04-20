import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';
import { Model, Types } from 'mongoose';
import { UserPlaylist, UserPlaylistDocument } from './entities/user-playlist.entity';
import { PlaylistOptionDto, UserPlaylistDto } from '../playlist/dto/playlist-option.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name)
    private playlistModel: Model<PlaylistDocument>,

    @InjectModel(UserPlaylist.name)
    private userPlaylistModel: Model<UserPlaylistDocument>,
  ) {}

  async getSelectOptions(): Promise<PlaylistOptionDto[]> {
    const playlists = await this.playlistModel.find().sort({ name: 1 }).lean();
    return playlists.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      imageUrl: p.imageUrl,
    }));
  }

  async saveUserPlaylists(userId: string, dto: UserPlaylistDto): Promise<string[]> {
    const playlistObjectIds = dto.playlistIds.map((id) => new Types.ObjectId(id));
    const objectUserId = new Types.ObjectId(userId);
  
    const existing = await this.userPlaylistModel.findOne({ userId: objectUserId });
  
    if (existing) {
      existing.playlistIds = playlistObjectIds;
      await existing.save();
    } else {
      await this.userPlaylistModel.create({
        userId: objectUserId,
        playlistIds: playlistObjectIds,
      });
    }
  
    return dto.playlistIds;
  }
  

  async getUserPlaylists(userId: string): Promise<PlaylistOptionDto[]> {
    const userPlaylist = await this.userPlaylistModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('playlistIds')
      .lean();
  
    if (!userPlaylist || !userPlaylist.playlistIds) {
      return [];
    }
  
    return userPlaylist.playlistIds.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      imageUrl: p.imageUrl,
    }));
  }
  
}
