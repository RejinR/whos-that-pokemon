import axios from 'axios';
import { Component, createSignal, onMount } from 'solid-js';
import TextInput from '../../component/TextInput/TextInput';
import PokemonSilhouette from '../../component/PokemonSilhouette/PokemonSilhouette';
import PokeballSpinner from '../../component/PokeballSpinner/PokeballSpinner';
import { getRandomNumber } from '../../utils/num-utils';
import { Pokemon } from '../../types';

const WhoThatPokemonPage: Component = () => {
  const [showSilhouette, setSilhouette] = createSignal<boolean>(true);
  const [pokemonToGuess, setPokemonToGuess] = createSignal<Pokemon | null>(
    null
  );
  const [pokemons, setPokemons] = createSignal<Pokemon[]>([]);
  const [guess, setGuess] = createSignal<string>('');
  onMount(async () => {
    setTimeout(async () => {
      const response = await axios.get('pokemons.json');
      setPokemons(response.data);
      setPokemonToGuess(response.data[0]);
    }, 2000);
  });
  const forfeit = () => {
    setSilhouette(false);
    setTimeout(() => {
      setGuess('');
      setSilhouette(true);
      setPokemonToGuess(pokemons()[getRandomNumber(151)]);
    }, 2000);
  };
  const onPokemonGuessChange = (pokemonGuess) => {
    setGuess(pokemonGuess);
    if (pokemonGuess.toLowerCase() === pokemonToGuess()?.name?.toLowerCase()) {
      // you guessed it right
      forfeit();
    }
  };
  const onGiveUp = () => {
    setGuess(pokemonToGuess()?.name!);
    forfeit();
  };
  return (
    <div class="grid items-center justify-center w-full h-full bg-[#3498db]">
      <div class="min-h-[650px] p-3 flex flex-col gap-4">
        <header class="text-white text-4xl">Who's That Pokemon ?</header>
        {pokemons().length && pokemonToGuess() && (
          <>
            <PokemonSilhouette
              pokemonToGuess={pokemonToGuess()}
              showSilhouette={showSilhouette()}
            />
            <TextInput value={guess()} onChange={onPokemonGuessChange} />
            <span class="text-white text-xl cursor-pointer" onClick={onGiveUp}>
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
