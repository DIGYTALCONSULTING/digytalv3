<template>
  <div>
    <!-- Botón flotante del Chatbot con notificación -->
    <div v-show="!chatVisible" @click="openChat" class="fixed bottom-8 right-8 p-4 bg-gradient-to-r to-indigo-600 text-white rounded-full cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50">
      <div class="relative">
        <img :src="logoMarca" alt="Chatbot" class="h-18 w-16"/>
        <span v-if="unreadMessages" class="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-25 w-25 flex items-center justify-center animate-pulse">
          {{ unreadMessages }}
        </span>
      </div>
    </div>

    <!-- Ventana del chat -->
    <div v-show="chatVisible" class="fixed bottom-0 right-0 w-full h-[80vh] max-w-md bg-white border-t-2 border-gray-200 rounded-t-xl shadow-2xl flex flex-col z-50" :class="{'animate-fade-in-up': chatVisible}">
      <div class="bg-gradient-to-r bg-[#C24704] text-white p-0 flex justify-between items-center rounded-t-xl">
        <div class="flex items-center space-x-2">
          <img :src="soloLogo" alt="Chatbot" class="h-12 w-12" />
          <h2 class="font-bold text-lg">Pregúntale a ¡Oe!</h2>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="closeChat" class="!bg-[#C26704] text-white text-8xl duration-300 transform">&times;</button>
        </div>
      </div>

      <!-- Enlace a redes sociales -->
      <div v-if="chatVisible > 0" class="flex justify-center gap-2 p-3 pd-2 bg-gray-50">
        <a href="https://wa.me/3144706996" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-green-400 transition-all">
          <img :src="iconWhatsapp" alt="WhatsApp" class="w-8 h-8" />
        </a>
        <a href="https://www.instagram.com/laverdeosorioandres/" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-pink-500 transition-all">
          <img :src="iconInstagram" alt="Instagram" class="w-8 h-8" />
        </a>
        <a href="mailto:digytalconsulting@outlook.com" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-700 hover:via-yellow-500 hover:to-black-500 transition-all">
          <img :src="iconEmail" alt="Email" class="w-8 h-8" />
        </a>
        <a href="https://web.telegram.org/k/" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:via-white-500 hover:to-black-500 transition-all">
          <img :src="iconTelegram" alt="Telegram" class="w-8 h-8" />
        </a>
      </div>

      <!-- Contenedor del chat -->
      <div ref="chatContainer" class="flex-1 p-4 space-y-4 overflow-y-auto scroll-smooth" :class="{'bg-gray-50': isNightMode}">
        <div v-if="messages.length === 0" class="text-center text-gray-500">
          <p>¡Hablalo! ¿Para que soy bueno?</p>
        </div>

        <div v-for="(msg, index) in messages" :key="index" class="mb-4">
          <div v-if="msg.type === 'user'" class="flex justify-end">
            <div class="p-3 rounded-lg max-w-xs md:max-w-md rounded-br-none shadow text-black">
              <p class="break-words">{{ msg.text }}</p>
              <p class="text-xs text-black text-right mt-1">{{ formatTime(msg.timestamp) }}</p>
            </div>
          </div>
          <div v-if="msg.type === 'bot'" class="flex justify-start">
            <div class="bg-gray-100 !text-gray-800 p-3 rounded-lg max-w-xs md:max-w-md rounded-bl-none shadow">
              <p class="break-words">{{ msg.text }}</p>
              <p class="text-xs text-gray-500 text-right mt-1">{{ formatTime(msg.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sugerencias rápidas -->
      <div v-if="showQuickSuggestions" class="px-4 pt-2 bg-gray-50 border-t">
        <div class="flex flex-wrap gap-2">
          <button v-for="(suggestion, index) in quickSuggestions" :key="index" @click="sendQuickSuggestion(suggestion)" class="text-sm !bg-gray-100 hover:bg-blue-200 text-black px-3 py-1 rounded-full transition-colors">
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- Caja de entrada de texto -->
      <div class="p-4 bg-gray-50 border-t">
        <form @submit.prevent="sendMessage" class="flex items-center space-x-2">
          <input v-model="userMessage" type="text" class="text-black flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 outline-none transition-all" placeholder="Contamelo escribe tu mensaje..." />
          <button type="submit" class="p-3 !bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" :disabled="!userMessage.trim()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Modal de checkout -->
    <div v-if="showCheckoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Formulario de Compra</h3>
        <form @submit.prevent="processCheckout" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input type="text" v-model="checkoutData.name" required class="w-full p-2 border border-gray-300 rounded-md text-black" placeholder="Tu nombre completo" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" v-model="checkoutData.email" required class="w-full p-2 border border-gray-300 rounded-md text-black" placeholder="tu.email@example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input type="tel" v-model="checkoutData.phone" class="w-full p-2 border border-gray-300 rounded-md text-black" placeholder="Tu número de teléfono" />
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="showCheckoutModal = false" type="button" class="px-4 py-2 border !bg-blue-800 border-gray-300 rounded-md text-white-700 hover:!bg-gray-800 transition-colors">Cancelar</button>
            <button type="submit" class="px-4 py-2 !bg-blue-800 text-white rounded-md hover:!bg-[#C24704] transition-colors duration-300">Confirmar Compra</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { io } from "socket.io-client";

// Rutas de las imágenes importadas
import logoMarca from '@/assets/logo_marca.png'
import soloLogo from '@/assets/logo_foot.png'
import iconWhatsapp from '@/assets/icon_whatsapp.svg'
import iconInstagram from '@/assets/icon_instagram.svg'
import iconEmail from '@/assets/icon_email.svg'
import iconTelegram from '@/assets/icon_telegram.svg'

// Estado del chat y mensajes
const messages = ref([]);
const userMessage = ref("");
const chatVisible = ref(false);
const unreadMessages = ref(0);
const isTyping = ref(false);
const chatContainer = ref(null);
const showCheckoutModal = ref(false);
const checkoutData = ref({ name: "", email: "", phone: "" });
const quickSuggestions = ref(["¿Qué tipos de landing pages ofrecen?", "¿Cuánto vale una landing page?"]);
const showQuickSuggestions = ref(true);

// Socket.IO
const socket = io("http://localhost:5000");

const openChat = () => {
  chatVisible.value = true;
  unreadMessages.value = 0;
  if (messages.value.length === 0) {
    setTimeout(() => {
      addBotMessage("¡Hablalo! ¿Para qué soy bueno?");
    }, 500);
  }
};

const closeChat = () => chatVisible.value = false;

// Añadir mensajes
const addUserMessage = (text) => {
  messages.value.push({
    type: "user",
    text,
    timestamp: new Date(),
  });
};

const addBotMessage = (text) => {
  messages.value.push({
    type: "bot",
    text,
    timestamp: new Date(),
  });
};

// Formatear tiempo
const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Conexión a Socket.IO
socket.on("botMessage", (msg) => {
  isTyping.value = false;
  addBotMessage(msg);
});

</script>

<style scoped>
/* Animaciones */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }

/* Scroll personalizado */
.scroll-smooth::-webkit-scrollbar { width: 6px; }
.scroll-smooth::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
.scroll-smooth::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
.scroll-smooth::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }
</style>
