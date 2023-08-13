import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { POKEMON_API_BASE_URL } from '../../constants/external-api/pokemon.api';
import { PokemonList } from './model/pokemon.list';
import { Pokemon } from './model/pokemon.entity';

@Injectable()
export class PokemonsService {
  /// Assuming "likes" below is from the database.
  private readonly likes: string[] = [];

  constructor(private readonly httpService: HttpService) {}

  async findAll(offset: number): Promise<PokemonList> {
    const url = `${POKEMON_API_BASE_URL}?offset=${offset}&limit=20`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const { results } = data;
    results.forEach((poke: Pokemon) => {
      poke.id = this.getId(poke.url);
      poke.isLiked = !!this.likes[this.likes.indexOf(poke.id)];
    });
    return data;
  }
  async updateLike(id: string) {
    const index = this.likes.indexOf(id);
    if (index === -1) {
      this.likes.push(id);
    } else {
      this.likes.splice(index, 1);
    }
    return true;
  }

  getId(url): string {
    return url.replace(`${POKEMON_API_BASE_URL}/`, '').replace('/', '');
  }
}
