import { IsNotEmpty } from 'class-validator';

export class PokemonIdParam {
  @IsNotEmpty()
  id: string;
}
