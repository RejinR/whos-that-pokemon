import { Component, createSignal, onMount } from "solid-js";
import PokemonSilhouette from "../component/PokemonSilhouette";
import TextInput from "../component/TextInput";

const WhoThatPokemonPage: Component = () => {
    const [showSilhouette, setSilhouette] = createSignal<boolean>(true);
    onMount(() => {
      setInterval(() => {
        setSilhouette(!showSilhouette());
      }, 2000);
    });
    return (
      <div class="grid items-center justify-center w-full h-full bg-[#3498db]">
        <div class="min-h-[650px] p-3 flex flex-col gap-4">
          <header class="text-white text-4xl">Who's That Pokemon ?</header>
          <PokemonSilhouette pokedexEntry={1} showSilhouette={showSilhouette()} />
          <TextInput />
          <span class="text-white text-xl cursor-pointer">I don't know !</span>
        </div>
      </div>
    );
  };
  
  export default WhoThatPokemonPage;