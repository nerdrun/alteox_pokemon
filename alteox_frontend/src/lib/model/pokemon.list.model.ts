import type {PokemonModel} from './pokemon.model';
export interface PokemonListModel {
  count: number;
  next: string;
  previous: string;
  results: PokemonModel[];
}
