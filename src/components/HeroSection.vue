<template>
  <div id="HeroSection"></div>
  <div class="flex h-screen">
    <div class="relative w-1/3">
        <img src="/src/assets/fabio_hero.png" alt="fabioheroweb" class="w-xl h-full" loading="lazy">    
        <div>
          <video autoplay muted loop playsinline
           src="/src/assets/video_hero.mp4" alt="video web DigytalConsulting" 
          class="absolute top-86 left-37 w-[200px] h-[200px] rounded-full object-cover z-10 animate__animated animate__lightSpeedInRight">
          </video>
        </div>
    </div>
    <!-- Agregamos un ID exclusivo para la HeroSection -->
    <div id="heroSection" class="w-1/3 flex flex-col justify-end animate__animated animate__lightSpeedInRight"> <!-- Clase personalizada -->
      <div class="bg-pixel-bg pt-4 pb-8">
        <div>
          <p class="text-xl text-center text-amber-50">¿Quieres tener una Web</p>
          <p class="text-xl text-center text-amber-50">para tu Idea de negocio?</p>          
        </div>
        <div>
          <a href="#ContacSection" class="block mt-4 text-white py-1 px-2 rounded transform scale-100 animate-bounce duration-180000">
            <button class="!bg-[#C24704] w-full text-white cursor-pointer border-round">
            <p class="italic text-amber-50">¡Nosotros</p>
            <p class="italic text-amber-50">podemos hacerlo Realidad por ti!</p>
            </button>
          </a>
        </div>
      </div>
    </div>
    <div class="w-1/3 flex flex-col justify-end">
        <img src="/src/assets/carla_hero.png" alt="Carla4" class="w-fit h-8/9" loading="lazy">
    </div>
  </div>
</template>

<style scoped>
/* Fondo pixelado con recuadros de tamaño irregular que se repiten sin bordes visibles */
.bg-pixel-bg {
  background-image: 
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 15%, transparent 15%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.1) 10%, transparent 10%, transparent 40%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 70%, transparent 70%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.3) 10%, transparent 15%, transparent 30%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.1) 90%, transparent 90%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.1) 10%, transparent 10%, transparent 40%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 70%, transparent 70%),
    linear-gradient(135deg, rgba(0, 0, 0, 0.1) 5%, transparent 5%, transparent 35%, rgba(0, 0, 0, 0.1) 35%, rgba(0, 0, 0, 0.1) 55%, transparent 55%);
  
  /* Tamaño de los recuadros ajustados para que se repita de manera más fluida */
  background-size: 150px 120px, 180px 150px, 200px 180px, 180px 150px;
  background-repeat: repeat;
  background-position: top left, top right, bottom left; /* Alineación para evitar bordes visibles */
  border-radius: 20px 10px 30px 5px ; 
}
</style>



<!-- Estilos globales sin aplicar fondo pixelado -->
<style>
body {
  margin: 0;
  background: linear-gradient(125deg, #4F2BBF, #2B8559, #0A2441);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  font-family: 'Segoe UI', sans-serif;
}

/* Fondo global sin aplicar el fondo pixelado */
.squares-bg {
  background-image: none;  /* Elimina el fondo pixelado global */
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

