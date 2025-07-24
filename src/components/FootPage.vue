<template>
  <footer class="bg-black text-white">
    <!-- Sección Superior -->
    <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <!-- Logo y descripción -->
      <div class="space-y-4">
        <img
          src="../assets/logo_foot.png"
          alt="Digytal Consulting"
          class="h-50"
        />
        <p class="text-sm">
          Asesoramos, Diseñamos, Desarrollamos y mejoramos tu presencia digital con páginas web profesionales y dinámicas.
        </p>
      </div>

      <!-- Algunos de nuestros clientes -->
      <div>
        <h3 class="font-semibold uppercase mb-4 text-sm">Algunos de nuestros clientes</h3>
        <ul class="space-y-2 text-sm">
          <li>Raza & Gourmet</li>
          <li>Licencias Carvajal Bogotá</li>
          <li>Contaplus</li>
          <!-- Añade aquí más logos o nombres -->
        </ul>
      </div>

      <!-- Conócenos -->
      <div>
        <h3 class="font-semibold uppercase mb-4 text-sm">Conócenos</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:underline">Como lo hacemos</a></li>
          <li><a href="#" class="hover:underline">Quienes somos</a></li>
        </ul>
      </div>

      <!-- Redes Sociales -->
      <div>
        <h3 class="font-semibold uppercase text-sm">Redes sociales</h3>
        <div class="flex space-x-4">
          <!-- Reemplaza con tus iconos SVG o componentes de iconos -->
          <a href="#" aria-label="Facebook" class="hover:text-gray-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <!-- SVG Facebook -->
            </svg>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-gray-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <!-- SVG Twitter -->
            </svg>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-gray-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <!-- SVG Instagram -->
            </svg>
          </a>
        </div>
        <ul class="text-sm mt-2">
          <li><a href="#" class="hover:underline">Instagram</a></li>
          <li><a href="#" class="hover:underline">OtraredX</a></li>
          <li><a href="#" class="hover:underline">Facebook</a></li>
        </ul>
      </div>
    </div>

    <!-- Sección Inferior -->
    <div class="border-t border-gray-800 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
        <p>©2025 Todos los derechos reservados</p>
        <div class="flex space-x-4">
          <a href="#" class="hover:underline">Política de Privacidad</a>
          <a href="#" class="hover:underline">Términos y Condiciones</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer a {
    transition: color 0.3s ease-in-out;
  }

  footer a:hover {
    color: #a1a1a1; /* Ajusta el color según el diseño */
  }

  .bg-gray-900 {
    background-color: #1a1a1a;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-xs {
    font-size: 0.75rem;
  }
</style>
