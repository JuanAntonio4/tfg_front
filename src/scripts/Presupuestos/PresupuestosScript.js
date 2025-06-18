import { ref, onMounted,onUnmounted  } from 'vue';
import { useMessagesStore } from '@/stores/messages';
import { useAutenticacionStore } from "@/stores/autenticacion";
import trabajoRealizadoAvisoAPI from '@/api/trabajoRealizadoAvisoAPI';
import html2pdf from 'html2pdf.js';

const trabajo_realizado_aviso = ref([]);
const aviso_id = ref(null);


async function obtenerTrabajoRealizadoPorAvisoId(id) {
  const autenticacionStore = useAutenticacionStore();
    const messagesStore = useMessagesStore();
    try {
        trabajo_realizado_aviso.value = await trabajoRealizadoAvisoAPI.obtenerTrabajosPorAvisoPresupuestos(id, autenticacionStore.token);
        console.log(trabajo_realizado_aviso.value)
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los trabajos realizados en los avisos.");
        
    }
    
};

function calcularTotalMateriales() {
  let total = 0;
  trabajo_realizado_aviso.value.forEach(trabajo => {
    if (Array.isArray(trabajo.material_usado)) {
      trabajo.material_usado.forEach(materialUsado => {
        total += materialUsado.cantidad * (materialUsado.material?.precio || 0);
      });
    }
  });
  return parseFloat(total.toFixed(2));
}

function calcularIVA() {
  const subtotal = calcularTotalMateriales();
  return parseFloat((subtotal * 0.21).toFixed(2)); 
}

function calcularTotalConIVA() {
  return parseFloat((calcularTotalMateriales() + calcularIVA()).toFixed(2));
}

function generarPDF() {
    const messagesStore = useMessagesStore();
  try{
  const element = document.getElementById("pdf-content"); 
  html2pdf()
      .set({
          margin: 10,
          filename: `Presupuesto-${trabajo_realizado_aviso.value[0].aviso.nombre}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait", precision: 12 },
      })
      .from(element)
      .save();
        messagesStore.showMessageSuccess("Documento generado en PDF correctamente.");
      } catch (error){
         messagesStore.showMessageErrors("Ha ocurrido un error al generar el PDF.");
      }
};

async function enviarCorreo() {
    const messageStore = useMessagesStore();
    try{
      const element = document.getElementById("pdf-content");
      let nombre = trabajo_realizado_aviso.value[0].aviso.nombre
      console.log(trabajo_realizado_aviso.value[0])
      const configuracion = {
        margin: 10,
        filename: `Presupuesto-${nombre}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", precision: 12 },
      };
  
      const pdfBlob = await html2pdf().set(configuracion).from(element).toPdf().outputPdf("blob");

      await trabajoRealizadoAvisoAPI.enviarPresupuestoPorCorreo(pdfBlob,nombre);

      messageStore.showMessageSuccess("Correo enviado con éxito");
      } catch (error){
        messageStore.showMessageErrors("Ha ocurrido un error al enviar el correo.");
      }
  
};
  



function setupTrabajoRealizadoAviso(route){
    aviso_id.value = route.params.id || null;
    onMounted(() => {
      if (aviso_id.value) {
        obtenerTrabajoRealizadoPorAvisoId(aviso_id.value);
      }

    });

    onUnmounted(() => {
        trabajo_realizado_aviso.value = [];
  
      });
}


  
export {
    trabajo_realizado_aviso,
    setupTrabajoRealizadoAviso,
    generarPDF,
    enviarCorreo,
    calcularTotalMateriales,
    calcularIVA,
    calcularTotalConIVA

};

