import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './decks.repository';
import axios from 'axios';
import { Deck } from './schema/deck.schema';


@Injectable()
export class DecksService {
  constructor(private readonly deckRepository: DecksRepository) {}

  async fetchCommander(nameCard: string): Promise<any> {
    const commanderObject = `https://api.magicthegathering.io/v1/cards?type=Legendary Creature&name=${nameCard}`;
    const Response = await axios.get(commanderObject);
    const commander = Response.data.cards[0];

    if (!commander) {
      throw new HttpException(
        'Commander Not Found',
        HttpStatus.NOT_FOUND,
      );
    }

    return commander;
  }

  async fetchBasicLands(colors: string): Promise<any> {
    const basicLandObject = `https://api.magicthegathering.io/v1/cards?type=Basic Land&colorIdentity=${colors}`;
    const response = await axios.get(basicLandObject);
    const basicLands = response.data.cards.slice(0, 99);

    return basicLands;
  }

  async buildDeck(cardName: string, userId: string): Promise<any> {
    const commander = await this.fetchCommander(cardName);
    const colorsCard = commander.colorIdentity.join('|');
    const basicLands = await this.fetchBasicLands(colorsCard);

    const deckCards = [commander, ...basicLands];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deckCards,
      userId: userId,
    };

    console.log(createDeckDto);

    return this.createDeck(createDeckDto);
  }

  async createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.deckRepository.create(createDeckDto);
  }

  async findAll(): Promise<Deck[]> {
    return this.deckRepository.findAll();
  }
}
