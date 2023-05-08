import axios from 'axios';
import { Component, Show, createSignal, onMount } from 'solid-js';
import TextInput from '../../component/TextInput/TextInput';
import PokemonSilhouette from '../../component/PokemonSilhouette/PokemonSilhouette';
import PokeballSpinner from '../../component/PokeballSpinner/PokeballSpinner';
import { getRandomNumber } from '../../utils/num-utils';
import { Pokemon } from '../../types';

let guessedPokemons: number[] = [];
const HS_KEY = 'high-score';

const WhoThatPokemonPage: Component = () => {
  const [highScore, setHighScore] = createSignal<number>(
    +(localStorage.getItem(HS_KEY) ?? '')
  );
  const [showSilhouette, setShowSilhouette] = createSignal<boolean>(true);
  const [score, setScore] = createSignal<number>(0);
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
    }, 5000);
  });

  const changePokemonToGuess = (gameLost: boolean) => {
    setShowSilhouette(false);
    setTimeout(() => {
      gameLost && setScore(0);
      guessedPokemons = [];
      setGuess('');
      setShowSilhouette(true);
      setPokemonToGuess(pokemons()[getUniquePokemon()]);
    }, 2000);
  };

  const getUniquePokemon = () => {
    const aRandomNumber = getRandomNumber(151);
    if (guessedPokemons.includes(aRandomNumber)) {
      return getUniquePokemon();
    }
    return aRandomNumber;
  };

  const onPokemonGuessChange = (pokemonGuess) => {
    setGuess(pokemonGuess);
    if (pokemonGuess.toLowerCase() === pokemonToGuess()?.name?.toLowerCase()) {
      // you guessed it right
      setScore(score() + 1);
      const pokemon = pokemonToGuess();
      guessedPokemons = guessedPokemons.concat(pokemon?.id!);
      changePokemonToGuess(false);
    }
  };

  const onGiveUp = () => {
    if (score() > highScore()) {
      setHighScore(score());
      localStorage.setItem(HS_KEY, score().toString());
    }
    setGuess(pokemonToGuess()?.name!);
    changePokemonToGuess(true);
  };

  return (
    <div class="w-full h-full bg-[#3498db]">
      <div class="text-white flex flex-col text-right text-2xl w-full p-4">
        High score: {highScore()}
      </div>
      <div class="grid items-center justify-center">
        <div class="min-h-[650px] p-3 flex flex-col gap-4">
          <header class="text-white text-4xl">Who's That Pokémon ?</header>
          <Show when={pokemons().length && pokemonToGuess()}>
            <PokemonSilhouette
              pokemonToGuess={pokemonToGuess()}
              showSilhouette={showSilhouette()}
            />
            <div class="text-white">Score: {score()}</div>
            <TextInput value={guess()} onChange={onPokemonGuessChange} />
            <span class="text-white text-xl cursor-pointer" onClick={onGiveUp}>
              I don't know !
            </span>
          </Show>
          <Show when={!pokemons().length}>
            <PokeballSpinner />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default WhoThatPokemonPage;
