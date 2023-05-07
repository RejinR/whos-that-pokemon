import axios from 'axios';
import { Component, createSignal, onMount } from 'solid-js';
import TextInput from '../../component/TextInput/TextInput';
import PokemonSilhouette from '../../component/PokemonSilhouette/PokemonSilhouette';
import PokeballSpinner from '../../component/PokeballSpinner/PokeballSpinner';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
}

const WhoThatPokemonPage: Component = () => {
  const [showSilhouette, setSilhouette] = createSignal<boolean>(true);
  const [pokemons, setPokemons] = createSignal<Pokemon[]>([]);
  onMount(async () => {
    setInterval(() => {
      setSilhouette(!showSilhouette());
    }, 2000);
    setTimeout(async () => {
      const response = await axios.get('pokemons.json');
      setPokemons(response.data);
    }, 2000);
  });
  return (
    <div class="grid items-center justify-center w-full h-full bg-[#3498db]">
      <div class="min-h-[650px] p-3 flex flex-col gap-4">
        <header class="text-white text-4xl">Who's That Pokemon ?</header>
        {pokemons().length && (
          <>
            <PokemonSilhouette
              pokedexEntry={1}
              showSilhouette={showSilhouette()}
            />
            <TextInput />
            <span class="text-white text-xl cursor-pointer">
              I don't know !
            </span>
          </>
        )}
        {!pokemons().length && <PokeballSpinner />}
      </div>
    </div>
  );
};

export default WhoThatPokemonPage;
