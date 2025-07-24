<template>
<div id="ContacSection"></div>
<div
    class="font-extrabold
           bg-gradient-to-r
           from-[#4F2BC0]
           via-[#0D68CC]
           to-[#1E5F50]"      
  >
    <h1 class="p-6 mb-0 text-base">¡Hey! Hablemos</h1>
    <h2>¡Estamos listos para apoyar tu proyecto! escribenos y te contactaremos en menos de 24 horas.!</h2>
  </div>
  <div
    class="flex justify-end w-full h-auto
           bg-gradient-to-r 
           from-[#4F2BC0]
           via-[#0D68CC]
           to-[#1E5F50]
           rounded-md border-0
           gap-18 p-4"
  >
    <!-- Caja de inputs y checkbox -->
    <div
      class="h-[450px] w-[650px] bg-repeat
             [background-image:linear-gradient(90deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent_100%),linear-gradient(180deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent_100%)]
             [background-size:150px_150px]
             [background-position:20px_20px]
             flex flex-col justify-center items-center
             space-y-4"
    >
      <!-- Email -->
      <div class="flex flex-col w-full max-w-sm h-8">
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          placeholder="Email*"
          class="w-full bg-transparent border-b border-white text-white font-extrabold placeholder-white py-2 focus:outline-none"
        />
      </div>
      <!-- Celular -->
      <div class="flex flex-col w-full max-w-sm">
        <input
          v-model="celular"
          type="tel"
          id="celular"
          name="celular"
          placeholder="Celular*"
          class="w-full bg-transparent border-b border-white text-white font-extrabold placeholder-white py-2 focus:outline-none"
        />
      </div>
      <!-- Nombres -->
      <div class="flex flex-col w-full max-w-sm">
        <input
          v-model="nombres"
          type="text"
          id="nombres"
          name="nombres"
          placeholder="Nombres*"
          class="w-full bg-transparent border-b border-white text-white font-extrabold placeholder-white py-2 focus:outline-none"
        />
      </div>
      <!-- Mensaje -->
      <div class="flex flex-col w-full max-w-sm">
        <textarea
          v-model="mensaje"
          id="mensaje"
          name="mensaje"
          rows="2"
          placeholder="Mensaje*"
          class="w-full bg-transparent border-b border-white text-white font-extrabold placeholder-white focus:outline-none resize-none"
        ></textarea>
      </div>

      <!-- Checkbox con validación -->
      <label class="flex items-start space-x-2 mt-4 max-w-sm">
        <input
          type="checkbox"
          v-model="agreed"
          :disabled="!isFormValid"
          class="
           form-checkbox h-12 w-12
           accent-black
           border-black
           
           focus:right-blue-500
           disabled:opacity-500"
        />
        <span class="text-white text-sm">
          Autorizo el tratamiento de mis datos personales de acuerdo con la 
          <span @click="openPrivacy" class="underline cursor-pointer">
            Política de Privacidad de datos
          </span>.
        </span>
      </label>

      <!-- Botón Enviar -->
      <button
        @click="submitForm"
        :disabled="!agreed"
        class="mt-2 px-2 py-2 !bg-[#FF7A00] hover:!bg-[#E56A00] text-[#FFFFFF] font-bold rounded
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </div>

    <!-- Imagen lateral -->
    <div>
      <img
        src="../assets/chica_hey.png"
        alt="Chica Section Hey"
      />
    </div>
  </div>

  <!-- Popup de Política de Privacidad -->
  <div
    v-if="showPrivacy"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
      <h3 class="text-xl font-bold mb-4">Política de Privacidad de datos</h3>
      <div class="max-h-80 overflow-y-auto text-sm leading-relaxed">
        <!-- Aquí tu política completa -->
        <p class="text-black">
          Política de Tratamiento de Datos Personales de Digytal Consulting Fecha de entrada en vigencia: 
          [Fecha específica, ejemplo: 10 de enero de 2025] En cumplimiento de la Ley 1581 de 2012 y el 
          Decreto 1377 de 2013, Digytal Consulting adopta la presente política para garantizar la protección, 
          privacidad y seguridad de los datos personales de los titulares de la información recolectada en el 
          desarrollo de su actividad comercial. 1. Identificación del Responsable del Tratamiento Razón Social: 
          Digytal Consulting Dirección: Tv. 113f #64A-12 Local 9 Teléfono: +57 322 4681595 Correo Electrónico: 
          digytalconsulting@gmail.com Página Web: wwww.digytalconsulting.com 2. Finalidad del Tratamiento de los 
          Datos Personales Digytal Consulting recolecta, almacena y utiliza datos personales con los siguientes 
          propósitos: Contactar al titular para brindar información y asesoría personalizada sobre los productos
           y servicios ofrecidos. Realizar encuestas de satisfacción para mejorar la calidad de los productos y 
           servicios. Enviar información promocional, ofertas y novedades relacionadas con los productos de comida 
           para mascotas. Gestionar solicitudes de contacto y atención al cliente. Cumplir con obligaciones legales y 
           contractuales derivadas de la relación comercial. 3. Principios para el Tratamiento de Datos Personales 
           Digytal Consulting aplicará los siguientes principios en el tratamiento de los datos personales: Legalidad: 
           El tratamiento de datos se realizará conforme a la Ley. Finalidad: Los datos serán recolectados para fines 
           legítimos y específicos. Libertad: Solo se tratarán datos con el consentimiento previo del titular. Veracidad: 
           La información recolectada será veraz, completa y actualizada. Acceso y Circulación Restringida: Solo personas 
           autorizadas tendrán acceso a los datos. Seguridad: Se garantizará la seguridad de los datos para evitar su adulteración, 
           pérdida o acceso no autorizado. 4. Derechos de los Titulares Como titular de los datos personales, usted tiene los siguientes
           derechos: Conocer, actualizar y rectificar sus datos personales frente a Digytal Consulting. Solicitar prueba de la 
           autorización otorgada. Ser informado sobre el uso que se le ha dado a sus datos. Revocar la autorización o solicitar 
           la supresión de sus datos cuando se haya incumplido la normativa. Acceder de forma gratuita a sus datos personales. 
           5. Procedimiento para el Ejercicio de los Derechos Los titulares pueden ejercer sus derechos presentando una solicitud 
           a través de los siguientes medios: Correo Electrónico: digytalconsulting@gmail.com Teléfono: +57 322 4681595 Dirección Física: 
           validar con Yisel La solicitud deberá incluir: Nombre completo del titular. Documento de identificación. Descripción 
           clara de la solicitud. Datos de contacto. Digytal Consulting responderá dentro de los plazos establecidos por la normativa vigente. 
           6. Seguridad de la Información Digytal Consulting implementa medidas técnicas, humanas y administrativas para garantizar la protección
          de los datos personales frente a accesos no autorizados, pérdida o manipulación. 7. Transferencia y Transmisión Internacional de Datos 
          Digytal Consulting no transferirá ni transmitirá datos personales a terceros ubicados en el exterior sin autorización previa, salvo en los 
          casos previstos por la Ley. 8. Vigencia de la Política Esta política de tratamiento de datos personales entra en vigor a partir de su fecha 
          de publicación y estará disponible para consulta en nuestro sitio web . 9. Actualizaciones Digytal Consulting se reserva el derecho de 
          modificar esta política en cualquier momento. Los cambios serán publicados en con al menos 10 días hábiles de antelación a su implementación. 
          Si tienes preguntas sobre esta política o necesitas más información, contáctanos a través de los canales dispuestos en esta política. 
          Digytal Consulting Comprometidos con la protección de tu privacidad 
        </p>
      </div>
      <button
        @click="closePrivacy"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Cerrar
      </button>    
    </div>    
    <h3>Nos ajustamos a tu presupuesto</h3>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const celular = ref('');
const nombres = ref('');
const mensaje = ref('');
const agreed = ref(false);
const showPrivacy = ref(false);

// Solo válido cuando los cuatro campos tienen texto:
const isFormValid = computed(
  () =>
    email.value.trim() &&
    celular.value.trim() &&
    nombres.value.trim() &&
    mensaje.value.trim()
);

function openPrivacy() {
  showPrivacy.value = true;
}
function closePrivacy() {
  showPrivacy.value = false;
}

// Aquí procesas o envías los datos:
function submitForm() {
  // Ejemplo: imprimir en consola
  console.log({
    email: email.value,
    celular: celular.value,
    nombres: nombres.value,
    mensaje: mensaje.value
  });
  // Acá podrías llamar a un API, emitir un evento, etc.
  alert('Datos enviados. ¡Gracias!');
}
</script>
