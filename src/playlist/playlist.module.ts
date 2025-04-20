import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Playlist, PlaylistSchema } from './entities/playlist.entity';
import { UserPlaylist, UserPlaylistSchema } from './entities/user-playlist.entity';
import { PlaylistSeeder } from './playlist.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: UserPlaylist.name, schema: UserPlaylistSchema },
    ]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistSeeder],
  exports: [PlaylistService],
})
export class PlaylistModule {}
