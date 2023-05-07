import { Component, createSignal, onMount } from "solid-js";
import PokemonSilhouette from "../component/PokemonSilhouette";

const WhoThatPokemonPage: Component = () => {
    const [showSilhouette, setSilhouette] = createSignal<boolean>(true);
    onMount(() => {
      setInterval(() => {
        setSilhouette(!showSilhouette());
      }, 2000);
    });
    return (
      <div class="grid items-center justify-center w-full h-full">
        <div class="bg-[#3498db] min-h-[650px] p-3">
          <header class="text-white text-4xl">Who's That Pokemon ?</header>
          <PokemonSilhouette pokedexEntry={1} showSilhouette={showSilhouette()} />
        </div>
      </div>
    );
  };
  
  export default WhoThatPokemonPage;