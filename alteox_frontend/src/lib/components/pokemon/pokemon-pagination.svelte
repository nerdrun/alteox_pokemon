<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  const BACKWARD = 'backward', FORWARD = 'forward';
  const dispatch = createEventDispatcher();

  export let next: string;
  let offset: number = 0;
  const paginate = (direction: string) => {
    if(offset === 0 && direction !== FORWARD) return;
    offset += direction === FORWARD ? 1 : -1;
    dispatch('paginate', offset);
  }
</script>
<div class="flex justify-center py-7">
  <button
    class="radius-2 px-2 py-1 text-white mx-1 bg-disabled border-none"
    class:enabled={offset !== 0}
    on:click={() => paginate(BACKWARD)}
  >
    Previous
  </button>
  <button
    class="radius-2 px-2 py-1 text-white mx-1 bg-disabled border-none"
    class:enabled={!!next}
    on:click={() => paginate(FORWARD)}
  >
    Next
  </button>
</div>
<style>
.enabled {
  background-color: rgb(123, 216, 255);
  cursor: pointer;
}
</style>
