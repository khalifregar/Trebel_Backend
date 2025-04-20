import { Controller, Get, Param, Post } from '@nestjs/common';
import { SoundtrackService } from './soundtrack.service';
import { success } from 'src/common/helpers/response.helper';

@Controller('soundtracks')
export class SoundtrackController {
  constructor(private readonly soundtrackService: SoundtrackService) {}

  // GET /soundtracks/by-playlist/:id
  @Get('by-playlist/:id')
  async getSoundtracks(@Param('id') playlistId: string) {
    const data = await this.soundtrackService.findByPlaylistId(playlistId);
    return success(data, 'List soundtrack berhasil diambil');
  }

  // POST /soundtracks/:id/play
  @Post(':id/play')
  async incrementPlayCount(@Param('id') soundtrackId: string) {
    const data = await this.soundtrackService.incrementPlayCount(soundtrackId);
    return success(data, 'Play count updated');
  }
  
  
}
