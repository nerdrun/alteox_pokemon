<script lang="ts">
  import { put } from '$lib/api/server-side-api';
  import type { PokemonModel } from '$lib/model/pokemon.model.js';
  import { POKEMON_API_IMAGE_URL } from '$lib/constants/pokemon-api';
  import { createEventDispatcher } from 'svelte';

  export let pokemon: PokemonModel;
  const dispatch = createEventDispatcher();

  const likePokemon = async () => {
    const res = await put({path: `/pokemons/${pokemon.id}`});
    const data: boolean = await res.json();
    if(data) dispatch('likePokemon', pokemon.id);
  }
</script>

<div class="flex flex-column relative pt-12">
  <div class="flex justify-center">
    <img
      class="absolute flex justify-center align-center top-0"
      src="{POKEMON_API_IMAGE_URL}/{pokemon.id}.png"
      alt="pokemon {pokemon.id} image"
    />
  </div>
  <div class="flex justify-center align-center radius-4 px-5 py-10 text-center card-container">
    <div class="text-16 mr-3">{pokemon.name}</div>
    <div class="flex justify-center">
      <button
        class="py-1 px-2 radius-4 bg-disabled text-10 cursor border-none"
        class:on={pokemon.isLiked}
        on:click={likePokemon}
      >
        &#x1F44D;
      </button>
    </div>
  </div>
</div>
<style>
.card-container {
  box-shadow: 0 1px 12px 0 rgba(10,10,10,.15);
}
.on {
  background-color: #0EB4F3;
}
</style>
