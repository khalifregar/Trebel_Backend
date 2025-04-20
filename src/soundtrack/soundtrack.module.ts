import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Soundtrack, SoundtrackSchema } from './entities/soundtrack.entity';
import { SoundtrackController } from './soundtrack.controller';
import { SoundtrackService } from './soundtrack.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Soundtrack.name, schema: SoundtrackSchema },
    ]),
  ],
  controllers: [SoundtrackController],
  providers: [SoundtrackService],
})
export class SoundtrackModule {}
