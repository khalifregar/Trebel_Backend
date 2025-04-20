import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Playlist.name)
    private playlistModel: Model<PlaylistDocument>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.playlistModel.countDocuments();
    if (count === 0) {
        await this.playlistModel.insertMany([
            { name: 'Raisa', imageUrl: 'https://placehold.co/600x400?text=Raisa' },
            { name: 'Tulus', imageUrl: 'https://placehold.co/600x400?text=Tulus' },
            { name: 'Isyana Sarasvati', imageUrl: 'https://placehold.co/600x400?text=Isyana' },
            { name: 'Afgan', imageUrl: 'https://placehold.co/600x400?text=Afgan' },
            { name: 'Judika', imageUrl: 'https://placehold.co/600x400?text=Judika' },
            { name: 'Yura Yunita', imageUrl: 'https://placehold.co/600x400?text=Yura' },
            { name: 'Maudy Ayunda', imageUrl: 'https://placehold.co/600x400?text=Maudy' },
            { name: 'Iqbaal Ramadhan', imageUrl: 'https://placehold.co/600x400?text=Iqbaal' },
            { name: 'Ardhito Pramono', imageUrl: 'https://placehold.co/600x400?text=Ardhito' },
            { name: 'Fiersa Besari', imageUrl: 'https://placehold.co/600x400?text=Fiersa' },
            { name: 'Pamungkas', imageUrl: 'https://placehold.co/600x400?text=Pamungkas' },
            { name: 'Nadin Amizah', imageUrl: 'https://placehold.co/600x400?text=Nadin' },
            { name: 'Hindia', imageUrl: 'https://placehold.co/600x400?text=Hindia' },
            { name: 'Sal Priadi', imageUrl: 'https://placehold.co/600x400?text=Sal+Priadi' },
            { name: 'Lyodra', imageUrl: 'https://placehold.co/600x400?text=Lyodra' },
            { name: 'Tiara Andini', imageUrl: 'https://placehold.co/600x400?text=Tiara' },
            { name: 'Ziva Magnolya', imageUrl: 'https://placehold.co/600x400?text=Ziva' },
            { name: 'Brisia Jodie', imageUrl: 'https://placehold.co/600x400?text=Brisia' },
            { name: 'GAC (Gamaliel Audrey Cantika)', imageUrl: 'https://placehold.co/600x400?text=GAC' },
            { name: 'RAN', imageUrl: 'https://placehold.co/600x400?text=RAN' },
            { name: 'NOAH', imageUrl: 'https://placehold.co/600x400?text=NOAH' },
            { name: 'Dewa 19', imageUrl: 'https://placehold.co/600x400?text=Dewa+19' },
            { name: 'Padi', imageUrl: 'https://placehold.co/600x400?text=Padi' },
            { name: 'Sheila On 7', imageUrl: 'https://placehold.co/600x400?text=SO7' },
            { name: 'Letto', imageUrl: 'https://placehold.co/600x400?text=Letto' },
            { name: 'Ungu', imageUrl: 'https://placehold.co/600x400?text=Ungu' },
            { name: 'Seventeen', imageUrl: 'https://placehold.co/600x400?text=Seventeen' },
            { name: 'Yovie & Nuno', imageUrl: 'https://placehold.co/600x400?text=Yovie+Nuno' },
            { name: 'Glenn Fredly', imageUrl: 'https://placehold.co/600x400?text=Glenn' },
            { name: 'Kahitna', imageUrl: 'https://placehold.co/600x400?text=Kahitna' },
            { name: 'The Changcuters', imageUrl: 'https://placehold.co/600x400?text=Changcuters' },
            { name: 'Geisha', imageUrl: 'https://placehold.co/600x400?text=Geisha' },
            { name: 'Kotak', imageUrl: 'https://placehold.co/600x400?text=Kotak' },
            { name: 'Wali', imageUrl: 'https://placehold.co/600x400?text=Wali' },
            { name: 'D\'Masiv', imageUrl: 'https://placehold.co/600x400?text=D\'Masiv' },
            { name: 'Naif', imageUrl: 'https://placehold.co/600x400?text=Naif' },
            { name: 'Barasuara', imageUrl: 'https://placehold.co/600x400?text=Barasuara' },
            { name: 'Efek Rumah Kaca', imageUrl: 'https://placehold.co/600x400?text=ERK' },
            { name: 'White Shoes & The Couples Company', imageUrl: 'https://placehold.co/600x400?text=WSATCC' },
            { name: 'Maliq & D’Essentials', imageUrl: 'https://placehold.co/600x400?text=Maliq' },
            { name: 'Fourtwnty', imageUrl: 'https://placehold.co/600x400?text=Fourtwnty' },
            { name: 'Payung Teduh', imageUrl: 'https://placehold.co/600x400?text=Payung+Teduh' },
            { name: 'The SIGIT', imageUrl: 'https://placehold.co/600x400?text=The+SIGIT' },
            { name: 'Endah N Rhesa', imageUrl: 'https://placehold.co/600x400?text=Endah+Rhesa' },
            { name: 'Hivi!', imageUrl: 'https://placehold.co/600x400?text=Hivi!' },
            { name: 'The Groove', imageUrl: 'https://placehold.co/600x400?text=The+Groove' },
            { name: 'Diskoria', imageUrl: 'https://placehold.co/600x400?text=Diskoria' },
            { name: 'Laleilmanino', imageUrl: 'https://placehold.co/600x400?text=Laleilmanino' },
            { name: 'Danilla', imageUrl: 'https://placehold.co/600x400?text=Danilla' }
          ]);
    }
  }
}
