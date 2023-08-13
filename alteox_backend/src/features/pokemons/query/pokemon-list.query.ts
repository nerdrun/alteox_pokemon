import { IsNotEmpty, IsOptional } from 'class-validator';

export class PokemonListQuery {
  @IsNotEmpty()
  @IsOptional()
  offset = 0;
}
