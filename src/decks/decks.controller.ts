import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DecksService } from './decks.service';
import { JwtAuthGuard } from '@/auth/jwt.guard';

@Controller('decks')
@UseGuards(JwtAuthGuard)
export class DecksController {
  constructor(private readonly decksService: DecksService) { }


  @Get()
  async findAll() {
    return this.decksService.findAll();
  }

  @Post('generate')
  async createDeck(
    @Body('CommanderName') Name: string,
    @Body('userId') userId: string,
  ) {
    return this.decksService.buildDeck(Name, userId);
  }


}
