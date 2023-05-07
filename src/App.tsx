import { Component, onMount } from "solid-js";
import axios from "axios";

const App: Component = () => {
  onMount(async () => {
    const response = await axios.get("1.png", { responseType: "arraybuffer" });
    const base64Image = btoa(
      new Uint8Array(response.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
    const img = new Image();
    img.src = "data:image/png;base64," + base64Image;
    img.onload = function () {
      const canvas: HTMLCanvasElement = document.getElementById(
        "area"
      ) as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
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
      var silhouetteImage = new Image();
      silhouetteImage.src = canvas.toDataURL();
    };

  });
  return (
    <div class="grid items-center justify-center w-full h-full">
      <div class="bg-[#3498db] min-h-[650px] p-3">
        <header class="text-white text-4xl">Who's That Pokemon ?</header>
        <img id="originalImage" src="1.png" />
        <canvas id="area" width="264" height="282"></canvas>
      </div>
    </div>
  );
};

export default App;
