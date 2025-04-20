import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RequestWithUser } from 'src/common/helpers/request-with-user.interface';
import { success, orNotFound } from 'src/common/helpers/response.helper';
import { UserPlaylistDto, PlaylistOptionDto } from './dto/playlist-option.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('select-options')
  async getPlaylistOptions() {
    const data = await this.playlistService.getSelectOptions();
    return success(data, 'Daftar artis berhasil diambil');
  }

  @UseGuards(JwtAuthGuard)
  @Post('user-playlists')
  async saveUserPlaylists(
    @Body() body: UserPlaylistDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;

    const result = await this.playlistService.saveUserPlaylists(userId, body);
    return success(result, 'Playlist berhasil disimpan');
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-playlists/me')
  async getUserPlaylists(@Req() req: RequestWithUser) {
    const userId = req.user.sub;

    const data = await this.playlistService.getUserPlaylists(userId);
    orNotFound(data, 'Kamu belum memilih playlist');
    return success(data, 'Playlist kamu berhasil diambil');
  }
}
