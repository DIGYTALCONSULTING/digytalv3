<template>
  <div>
    <!-- Botón flotante del Chatbot con notificación -->
    <div
      v-show="!chatVisible"
      @click="openChat"
      class="fixed bottom-8 right-8 p-4 bg-gradient-to-r to-indigo-600 text-white rounded-full cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
    >
      <div class="relative">
        <img src="../assets/logo_marca.png" alt="Chatbot" class="h-18 w-16"/>        
        <span v-if="unreadMessages" class="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-25 w-25 flex items-center justify-center animate-pulse">
          {{ unreadMessages }}
        </span>
      
      </div>
    </div>
    <!-- Ventana del chat -->
    <div
      v-show="chatVisible"
      class="fixed bottom-0 right-0 w-full h-[80vh] max-w-md bg-white border-t-2 border-gray-200 rounded-t-xl shadow-2xl flex flex-col z-50"
      :class="{'animate-fade-in-up': chatVisible}"
    >
      <!-- Encabezado del chat -->
      <div class="bg-gradient-to-r bg-[#C24704] text-white p-0 flex justify-between items-center rounded-t-xl">
        <div class="flex items-center space-x-2">
          <img src="../../assets/Images/solo_logo.png" alt="Chatbot" class="h-12 w-12" />
          <h2 class="font-bold text-lg">Pregúntale a ¡Oe!</h2>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="closeChat" class="!bg-[#C26704] text-white text-8xl duration-300 transform">
            &times;
          </button>
        </div>
      </div>
       <!-- Enlace a redes sociales -->
          <div v-if="chatVisible> 0" class="flex justify-center gap-2 p-3 pd-2 bg-gray-50">
            <!-- WhatsApp -->
            <a href="https://wa.me/3144706996" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-green-400 transition-all">
              <img src="../../assets/Images/icon_whatsapp.svg" alt="WhatsApp" class="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/laverdeosorioandres/" target="_blank" class="p-3 rounded-full  hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 transition-all">
              <img src="../../assets/Images/icon_instagram.svg" alt="instagram" class="w-8 h-8" />
            </a>
            <a href="mailto:digytalconsulting@outlook.com" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-700 hover:via-yellow-500 hover:to-black-500 transition-all">
              <img src="../../assets/Images/icon_email.svg" alt="email" class="w-8 h-8" />
            </a>
            <a href="https://web.telegram.org/k/" target="_blank" class="p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:via-white-500 hover:to-black-500 transition-all">
              <img src="../../assets/Images/icon_telegram.svg" alt="telegram" class="w-8 h-8" />
            </a>
          </div>

      <!-- Contenedor del chat -->
      <div 
        ref="chatContainer"
        class="flex-1 p-4 space-y-4 overflow-y-auto scroll-smooth"
        :class="{'bg-gray-50': isNightMode}"
      >
        <!-- Mensaje de bienvenida inicial -->
        <div v-if="messages.length === 0" class="text-center text-gray-500">
          <p>¡Hablalo! ¿Para que soy bueno?</p>
        </div>
        <!-- Mensajes del chat -->
        <div v-for="(msg, index) in messages" :key="index" class="mb-4">
          <!-- Mensaje del usuario -->
          <div v-if="msg.type === 'user'" class="flex justify-end">
            <div class="p-3 rounded-lg max-w-xs md:max-w-md rounded-br-none shadow text-black">
              <p class="break-words">{{ msg.text }}</p>
              <p class="text-xs text-black text-right mt-1">{{ formatTime(msg.timestamp) }}</p>
            </div>
          </div>
          <!-- Mensaje del bot -->
          <div v-if="msg.type === 'bot'" class="flex justify-start">
            <div class="bg-gray-100 !text-gray-800 p-3 rounded-lg max-w-xs md:max-w-md rounded-bl-none shadow">
              <p class="break-words">{{ msg.text }}</p>
              <div v-if="msg.quickReplies" class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="(reply, i) in msg.quickReplies"
                  :key="i"
                  @click="sendQuickReply(reply)"
                  class="text-xs !bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full transition-colors duration-200"
                >
                  {{ reply }}
                </button>
              </div>
              <p class="text-xs text-gray-500 text-right mt-1">{{ formatTime(msg.timestamp) }}</p>
            </div>
          </div>
          
          <!-- Opciones de producto -->
          <div v-if="msg.type === 'product'" class="flex justify-start">
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 max-w-xs md:max-w-md">
              <h3 class="font-bold text-blue-600">{{ msg.product.name }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ msg.product.description }}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="font-bold text-gray-900">${{ msg.product.price }}</span>
                <button 
                  @click="showCheckout(msg.product)"
                  class="!bg-[#0062CC] hover:!bg-[#C24704] text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicador de que el bot está escribiendo -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sugerencias rápidas -->
      <div v-if="showQuickSuggestions" class="px-4 pt-2 bg-gray-50 border-t">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(suggestion, index) in quickSuggestions"
            :key="index"
            @click="sendQuickSuggestion(suggestion)"
            class="text-sm !bg-gray-100 hover:bg-blue-200 text-black px-3 py-1 rounded-full transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- Caja de entrada de texto -->
      <div class="p-4 bg-gray-50 border-t">
  <form @submit.prevent="sendMessage" class="flex items-center space-x-2">
    <!-- Campo de mensaje del usuario -->
    <input
      v-model="userMessage"
      type="text"
      class="text-black flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 outline-none transition-all"
      placeholder="Contamelo escribe tu mensaje..."
      @focus="handleInputFocus"
    />
    <!-- Botón para enviar el mensaje -->
    <button
      type="submit"
      class="p-3 !bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      :disabled="!userMessage.trim()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Botón para reiniciar el chatbot -->
          </form>
  </div>

    </div>

    <!-- Modal de checkout -->
<div v-if="showCheckoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Formulario de Compra</h3>
    <h4 class="text-lg font-semibold text-gray-800 mb-4">Selecciona un Medio de Pago</h4>        

    <!-- Medios de Pago -->
    <div class="flex items-center justify-center space-x-4 mb-6"> 
      <!-- Enlace a Nequi -->
      <a href="https://www.nequi.com.co" target="_blank" class="transition-all hover:scale-105">
        <img src="../../assets/Images/icon_nequi.png" alt="Nequi" class="w-10 h-10" />
      </a>

      <!-- Enlace a Mercado Pago -->
      <a href="https://www.mercadopago.com.co" target="_blank" class="transition-all hover:scale-105">
        <img src="../../assets/Images/icon_mercado_pago.svg" alt="Mercado Pago" class="w-10 h-10" />
      </a>

      <!-- Enlace a Daviplata -->
      <a href="https://www.daviplata.com" target="_blank" class="transition-all hover:scale-105">
        <img src="../../assets/Images/icon_daviplata.svg" alt="Daviplata" class="w-10 h-10" />
      </a>
    </div>

    <div class="mb-4">
      <h4 class="font-semibold">{{ selectedProduct.name }}</h4>
      <p class="text-gray-600">Valor a pagar: ${{ selectedProduct.price }}</p>
    </div>

    <!-- Formulario de Compra -->
    <form @submit.prevent="processCheckout" class="space-y-4">
      <div class="space-y-4">
        <!-- Nombre Completo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input 
            type="text" 
            v-model="checkoutData.name" 
            required 
            class="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Tu nombre completo"
          />
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            v-model="checkoutData.email" 
            required 
            class="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="tu.email@example.com"
          />
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input 
            type="tel" 
            v-model="checkoutData.phone" 
            class="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Tu número de teléfono"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="mt-6 flex justify-end space-x-3">
        <button 
          @click="showCheckoutModal = false" 
          type="button" 
          class="px-4 py-2 border !bg-blue-800 border-gray-300 rounded-md text-white-700 hover:!bg-gray-800 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 !bg-blue-800 text-white rounded-md hover:!bg-[#C24704] transition-colors duration-300"
        >
          Confirmar Compra
        </button>
      </div>
    </form>
  </div>
</div>


    
    
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from "vue";
import { io } from "socket.io-client";

export default {
  setup() {
    // Estados del chat
    const messages = ref([]);
    const userMessage = ref("");
    const chatVisible = ref(false);
    const unreadMessages = ref(0);
    const isTyping = ref(false);
    const typingIndicator = ref(true);
    const chatContainer = ref(null);
    const isNightMode = ref(false);
    const showCheckoutModal = ref(false);
    const selectedProduct = ref({});
    const checkoutData = ref({
      name: "",
      email: "",
      phone: ""
    });

    // Productos disponibles
    const products = ref([
      {
        id: 1,
        name: "Arranque Sencillo",
        description: "Diseño y desarrollo de la página web personalizados (hasta 5 secciones), identidad de marca básica y funcionalidades básicas (links a redes, animaciones básicas y formulario de contacto para guardar datos de clientes)",
        price:"400.000 COP",
        features: ["Diseño responsive", "Formulario de contacto", "Link a redes", "Soporte Técnico"]
      },
      {
        id: 2,
        name: "Metale Ganas",
        description: "Diseño y desarrollo de la página web personalizados (hasta 10 secciones), identidad de marca avanzada y funcionalidades avanzadas (Chat bot con flujo para ventas hasta 50 respuestas prestablecidas, links a redes, animaciones y formulario de contacto para guardar datos de clientes)",
        price:"800.000 COP",
        features: ["Diseño 100% personalizado y responsivo", "Animaciones CSS", "Link a redes", "Soporte Técnico"]
      },
      {
        id: 3,
        name: "Hagale con Toda",
        description: "Solución completa para ventas online con integración de carrito de compras y pasarela de pagos, incluye las funiones de los planea anteriores que se deseen implementar.",
        price:" Completamente ajustado a tus necesidades COP",
        features: ["Catálogo de productos", "Carrito de compras", "Pasarela de pago"]
      }
    ]);

    // Sugerencias rápidas
    const quickSuggestions = ref([
    "¿Qué tipos de landing pages ofrecen?",
      "¿Cuánto vale una landing page?",
    ]);
    const showQuickSuggestions = ref(true);

    // Conexión con el servidor
    const socket = io("http://localhost:5000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Abrir el chat
    const openChat = () => {
      chatVisible.value = true;
      unreadMessages.value = 0;
      // Enviar mensaje de bienvenida si es la primera vez
      if (messages.value.length === 0) {
        setTimeout(() => {
          addBotMessage("¡Hablalo! ¿Para qué soy bueno? Aquí puedes preguntar o comprar.");
        }, 500);
      }
    };

    // Cerrar el chat
    const closeChat = () => {
      chatVisible.value = false;
    };

    // Manejar el foco en el input
    const handleInputFocus = () => {
      showQuickSuggestions.value = true;
    };

    // Añadir mensaje del usuario
    const addUserMessage = (text) => {
      messages.value.push({
        type: "user",
        text: text,
        timestamp: new Date()
      });
      scrollToBottom();
    };

    // Añadir mensaje del bot
    const addBotMessage = (text, quickReplies = null) => {
      messages.value.push({
        type: "bot",
        text: text,
        quickReplies: quickReplies,
        timestamp: new Date()
      });
      scrollToBottom();
    };

    // Mostrar producto
    const showProduct = (product) => {
      messages.value.push({
        type: "product",
        product: product,
        timestamp: new Date()
      });
      scrollToBottom();
    };

    // Enviar mensaje
    const sendMessage = () => {
      if (userMessage.value.trim()) {
        addUserMessage(userMessage.value);
        
        // Simular que el bot está escribiendo
        if (typingIndicator.value) {
          isTyping.value = true;
        }
        
        // Enviar al servidor
        socket.emit("userMessage", userMessage.value);
        
        // Procesar localmente (para demo)
        processUserMessage(userMessage.value);
        
        userMessage.value = "";
        showQuickSuggestions.value = false;
      }
    };

    // Procesar mensaje del usuario
    const processUserMessage = (message) => {
      const lowerMsg = message.toLowerCase();
      
      setTimeout(() => {
        isTyping.value = false;
        
        if (lowerMsg.includes("hola") || lowerMsg.includes("buenos días") || lowerMsg.includes("buenas tardes")) {
          addBotMessage("¡Hola! ¿En qué puedo ayudarte hoy? ¿Te interesa conocer más sobre nuestras opciones?", [
            "Sí, cuéntame más", 
            "¿Qué tipos tienen?", 
            "¿Cuáles son los precios?"
          ]);
        } 
        else if (lowerMsg.includes("tipos") || lowerMsg.includes("qué ofrecen") || lowerMsg.includes("qué tienen")) {
          addBotMessage("Ofrecemos tres tipos principales de landing pages:");
          setTimeout(() => {
            showProduct(products.value[0]);
            setTimeout(() => {
              showProduct(products.value[1]);
              setTimeout(() => {
                showProduct(products.value[2]);
                addBotMessage("¿Te interesa alguna en particular o necesitas más información?", [
                  "Arranque Sencillo", 
                  "Metale Ganas", 
                  "Hagale con toda"
                ]);
              }, 300);
            }, 300);
          }, 300);
        }
        else if (lowerMsg.includes("precio") || lowerMsg.includes("cuánto cuesta") || lowerMsg.includes("coste")) {
          addBotMessage("Nuestros precios varían según las características:", [
            "Arranque Sencillo ($400.000)", 
            "Metale Ganas ($800.000)", 
            "Hagale con Toda ($Personalizado)"
          ]);
        }
        else if (lowerMsg.includes("Arranque Sencillo") || lowerMsg.includes("400.000")) {
          addBotMessage("La Landing Page Básica incluye diseño responsive, formulario de contacto y optimización SEO básica. Perfecta para pequeños negocios que necesitan presencia online.", [
            "Comprar Arranque Sencillo", 
            "Ver Hagale con Toda", 
            "Comparar"
          ]);
        }
        else if (lowerMsg.includes("Metale Ganas") || lowerMsg.includes("800.000")) {
          addBotMessage("La Landing Page Premium incluye diseño personalizado, animaciones CSS, integración con CRM y capacidad para A/B Testing. Ideal para campañas de marketing profesionales.", [
            "Comprar Metale Ganas", 
            "Ver Hagale con Toda", 
            "Comparar"
          ]);
        }
        else if (lowerMsg.includes("Hagale con Toda") || lowerMsg.includes("personalizado") || lowerMsg.includes("comercio")) {
          addBotMessage("La Landing Page E-commerce es una solución completa con catálogo de productos, carrito de compras, pasarela de pago y panel de administración. Perfecta para vender productos online.", [
            "Comprar Hagale con Toda", 
            "Ver Arranque Sencillo", 
            "Necesito algo personalizado"
          ]);
        }
        else if (lowerMsg.includes("comprar") || lowerMsg.includes("quiero") || lowerMsg.includes("orden")) {
          if (lowerMsg.includes("Arranque Sencillo")) {
            showCheckout(products.value[0]);
          } else if (lowerMsg.includes("Metale Ganas")) {
            showCheckout(products.value[1]);
          } else if (lowerMsg.includes("Hagale con Toda")) {
            showCheckout(products.value[2]);
          } else {
            addBotMessage("¿Qué paquete te interesa comprar?", [
              "Arranque Sencillo ($500.000)", 
              "Metale Ganas ($800.000)", 
              "Hagale con Toda ($personalizado)"
            ]);
          }
        }
        else if (lowerMsg.includes("gracias") || lowerMsg.includes("genial")) {
          addBotMessage("¡De nada! ¿Hay algo más en lo que pueda ayudarte?", [
            "Sí, otra pregunta", 
            "No, gracias"
          ]);
        }
        else if (lowerMsg.includes("no") && (lowerMsg.includes("gracias") || lowerMsg.includes("más"))) {
          addBotMessage("Perfecto, ¡fue un placer ayudarte! Si necesitas algo más en el futuro, estaré aquí. ¡Que tengas un excelente día!");
        }
        else {
          addBotMessage("Entiendo que quieres información sobre: " + message + ". Nuestro equipo se especializa en landing pages de alta conversión. ¿Te gustaría que te explique nuestros paquetes?", [
            "Sí, por favor", 
            "Prefiero hablar con un humano"
          ]);
        }
      }, 1500);
    };

    // Enviar sugerencia rápida
    const sendQuickSuggestion = (suggestion) => {
      userMessage.value = suggestion;
      sendMessage();
    };

    // Enviar respuesta rápida
    const sendQuickReply = (reply) => {
      userMessage.value = reply;
      sendMessage();
    };

    // Mostrar checkout
    const showCheckout = (product) => {
      selectedProduct.value = product;
      showCheckoutModal.value = true;
    };

    // Procesar checkout
    const processCheckout = () => {
      showCheckoutModal.value = false;
      addBotMessage(`¡Gracias por tu compra de ${selectedProduct.value.name}! Hemos enviado los detalles a ${checkoutData.value.email}. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.`);
      
      // Aquí normalmente enviarías los datos al backend
      console.log("Datos de compra:", {
        product: selectedProduct.value,
        customer: checkoutData.value
      });
      
      // Resetear datos del formulario
      checkoutData.value = {
        name: "",
        email: "",
        phone: ""
      };
    };

    // Formatear hora
    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Scroll al final del chat
    const scrollToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      });
    };

    // Alternar indicador de escritura
    const toggleTypingIndicator = () => {
      typingIndicator.value = !typingIndicator.value;
    };

    // Escuchar mensajes del servidor
    socket.on("botMessage", (msg) => {
      isTyping.value = false;
      addBotMessage(msg);
    });

    // Escuchar cambios en la visibilidad del chat
    watch(chatVisible, (visible) => {
      if (visible) {
        scrollToBottom();
        unreadMessages.value = 0;
      }
    });

    // Escuchar nuevos mensajes cuando el chat está cerrado
    watch(messages, (newVal) => {
      if (!chatVisible.value && newVal.length > 0 && newVal[newVal.length - 1].type === 'bot') {
        unreadMessages.value++;
      }
    }, { deep: true });

    // Comprobar la hora para modo nocturno
    onMounted(() => {
      const hour = new Date().getHours();
      isNightMode.value = hour < 6 || hour >= 18;
    });

    return {
      messages,
      userMessage,
      chatVisible,
      unreadMessages,
      isTyping,
      typingIndicator,
      chatContainer,
      isNightMode,
      quickSuggestions,
      showQuickSuggestions,
      showCheckoutModal,
      selectedProduct,
      checkoutData,
      products,
      openChat,
      closeChat,
      sendMessage,
      sendQuickSuggestion,
      sendQuickReply,
      showCheckout,
      processCheckout,
      formatTime,
      handleInputFocus,
      toggleTypingIndicator
    };
  }
};
</script>

<style scoped>
/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

/* Scroll personalizado */
.scroll-smooth::-webkit-scrollbar {
  width: 6px;
}

.scroll-smooth::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.scroll-smooth::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.scroll-smooth::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Transiciones */
.transition-all {
  transition: all 0.3s ease;
}
</style>