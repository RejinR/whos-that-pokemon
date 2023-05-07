import { onCleanup, onMount } from 'solid-js';
import './PokeballSpinner.css';

const PokeballSpinner = () => {
  let imgRef;
  let interval;
  onMount(() => {
    const shaker = () => {
      imgRef.classList.add('shaker');
      setTimeout(() => {
        imgRef.classList.remove('shaker');
      }, 1400);
    };
    shaker();
    interval = setInterval(shaker, 2000);
  });
  onCleanup(() => {
    clearInterval(interval);
  });
  return (
    <div class="self-center flex-grow flex items-center">
      <img src="pokeball.png" class="w-12 h-12" ref={imgRef} />
    </div>
  );
};

export default PokeballSpinner;
