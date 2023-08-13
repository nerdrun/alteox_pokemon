<script lang='ts'>
  import '$lib/styles/global.css';
  import { onMount } from 'svelte';
  import { get } from '$lib/api/server-side-api';
  import type { PokemonListModel } from '$lib/model/pokemon.list.model';
  import type { PokemonModel } from '$lib/model/pokemon.model';
  import PokemonHeader from '$lib/components/pokemon/pokemon-header.svelte';
  import PokemonItem from '$lib/components/pokemon/pokemon-item.svelte';
  import PokemonPagination from '$lib/components/pokemon/pokemon-pagination.svelte';

  const LIMIT = 20;
  let pokemons: PokemonModel[] = [];
  let next = '';

  const likePokemon = ({ detail: id } : CustomEvent) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);
    pokemons[index].isLiked = !pokemons[index].isLiked;
  }

  const paginate = async ({ detail: currentPage }: CustomEvent) => await getPokemonList(currentPage);

  const getPokemonList = async(offset: number) => {
    const res = await get({path: `/pokemons?offset=${offset * LIMIT}`});
    const data: PokemonListModel = await res.json();
    pokemons = data.results;
    next = data.next;
  }
  onMount(async () => getPokemonList(0));
</script>

<div class="flex flex-column">
  <PokemonHeader />
  <div class="grid-card">
    {#each pokemons as pokemon}
      <PokemonItem {pokemon} on:likePokemon={likePokemon} />
    {/each}
  </div>
  <PokemonPagination on:paginate={paginate} {next}/>
</div>
