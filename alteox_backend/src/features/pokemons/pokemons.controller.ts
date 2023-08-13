import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonListQuery } from './query/pokemon-list.query';
import { PokemonIdParam } from './param/pokemon-id.param';
import { PokemonList } from './model/pokemon.list';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async findAll(
    @Query() pokemonListQuery: PokemonListQuery,
  ): Promise<PokemonList> {
    const { offset } = pokemonListQuery;
    return this.pokemonsService.findAll(offset);
  }

  @Put(':id')
  async updateLike(@Param() param: PokemonIdParam) {
    const { id } = param;
    return this.pokemonsService.updateLike(id);
  }
}
