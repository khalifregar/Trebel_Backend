import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Playlist, PlaylistSchema } from './entities/playlist.entity';
import { UserPlaylist, UserPlaylistSchema } from './entities/user-playlist.entity';


import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Soundtrack, SoundtrackSchema } from 'src/soundtrack/entities/soundtrack.entity';
import { SoundtrackController } from 'src/soundtrack/soundtrack.controller';
import { SoundtrackSeeder } from 'src/soundtrack/soundtrack.seeder';
import { SoundtrackService } from 'src/soundtrack/soundtrack.service';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
      { name: UserPlaylist.name, schema: UserPlaylistSchema },
      { name: Soundtrack.name, schema: SoundtrackSchema },
    ]),
  ],
  controllers: [
    PlaylistController,
    SoundtrackController,
  ],
  providers: [
    PlaylistService,
    SoundtrackService,
    SoundtrackSeeder, // ✅ daftarin seeder ke providers
  ],
})
export class PlaylistModule {}
