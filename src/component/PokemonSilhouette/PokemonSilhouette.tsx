import axios from 'axios';
import { Component, Show, createEffect, onMount } from 'solid-js';
import { Pokemon } from '../../types';

const PokemonSilhouette: Component<{
  pokemonToGuess: Pokemon | null;
  showSilhouette: boolean;
}> = (props) => {
  createEffect(() => {
    drawSilhouette(props.pokemonToGuess?.id);
  });

  const drawSilhouette = async (pokemonId) => {
    const response = await axios.get(`${pokemonId}.png`, {
      responseType: 'arraybuffer',
    });
    const base64Image = btoa(
      new Uint8Array(response.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, '')
    );
    const img = new Image();
    img.src = 'data:image/png;base64,' + base64Image;
    img.onload = function () {
      const canvas: HTMLCanvasElement = document.getElementById(
        'silhouette-canvas'
      ) as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Iterate through each pixel and convert it to silhouette
      for (let i = 0; i < pixels.length; i += 4) {
        // Set the red, green, and blue channels to 0 (black)
        pixels[i] = 0; // Red channel
        pixels[i + 1] = 0; // Green channel
        pixels[i + 2] = 0; // Blue channel
        // Alpha channel remains unchanged, which preserves transparency
      }

      // Update the canvas with the modified pixel data
      ctx.putImageData(imageData, 0, 0);

      // Create a new image element for the silhouette image
      const silhouetteImage = new Image();
      silhouetteImage.src = canvas.toDataURL();
    };
  };
  onMount(() => drawSilhouette(1));
  return (
    <div class="flex flex-col justify-center items-center min-h-[350px] flex-grow">
      <canvas
        id="silhouette-canvas"
        classList={{ hidden: !props.showSilhouette }}
      />
      <Show when={!props.showSilhouette}>
        <img src={`${props.pokemonToGuess?.id}.png`} />
      </Show>
    </div>
  );
};

export default PokemonSilhouette;
