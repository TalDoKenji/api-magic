// import { CardDTO } from "@/decks/dto/cards.dto"

export interface IDeck extends Document {


    commanderName: string,
    cards: [],
    userId: string
}