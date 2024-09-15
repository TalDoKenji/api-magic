import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.schema';
import { Document } from 'mongoose';

@Schema()
export class Deck extends Document {
  @Prop({ required: true })
  commander: string;

  @Prop({ type: [CardSchema], required: true })
  cards: Card[];

  @Prop({ required: true })
  userId: string;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
