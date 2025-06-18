
import { ref, onMounted,onUnmounted  } from 'vue';
import { useMessagesStore } from '@/stores/messages';
import { useAutenticacionStore } from "@/stores/autenticacion";
import trabajoRealizadoAvisoAPI from '@/api/trabajoRealizadoAvisoAPI';
import trabajoRealizadoObraAPI from '@/api/trabajoRealizadoObraAPI';
import html2pdf from 'html2pdf.js';

const trabajo_realizado_aviso = ref([]);
const trabajo_realizado_obra = ref([]);
const id = ref(null);
const tipo = ref(null)


async function obtenerTrabajoRealizadoPorAvisoIdInformes(id) {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
        trabajo_realizado_aviso.value = await trabajoRealizadoAvisoAPI.obtenerTrabajosPorAvisoInformes(id, autenticacionStore.token);
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los trabajos realizados para generar el informe de los avisos.");
        
    }
    
};

async function obtenerTrabajoRealizadoPorObraIdInformes(id) {
    const messagesStore = useMessagesStore();
    const autenticacionStore = useAutenticacionStore();
    try {
        trabajo_realizado_obra.value = await trabajoRealizadoObraAPI.obtenerTrabajosPorObraInformes(id, autenticacionStore.token)    
    } catch (error) {
        messagesStore.showMessageErrors("Ha ocurrido un error al obtener los trabajos realizados para generar el informe de las obras.");
        
    }
    
};

function generarPDF() {
  const messagesStore = useMessagesStore();
  try{
    const element = document.getElementById("pdf-container"); 
    let nombre = "Informe"
    if (tipo.value === 'aviso') {
      nombre = trabajo_realizado_aviso.value[0].aviso.nombre
    }else{
      nombre = trabajo_realizado_obra.value[0].obra.nombre
    }
    
    html2pdf()
        .set({
            margin: 10,
            filename: `Informe-${nombre}.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2.5 },
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
      const element = document.getElementById("pdf-container");
      let nombre = "Informe"
      if (tipo.value === 'aviso') {
        nombre = trabajo_realizado_aviso.value[0].aviso.nombre
      }else{
        nombre = trabajo_realizado_obra.value[0].obra.nombre
      }
      const configuracion = {
        margin: 10,
        filename: `Informe-${nombre}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2.5 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", precision: 12 },
      };
  
      const pdfBlob = await html2pdf().set(configuracion).from(element).toPdf().outputPdf("blob");

      await trabajoRealizadoAvisoAPI.enviarInformePorCorreo(pdfBlob,nombre);

      messageStore.showMessageSuccess("Correo enviado con éxito");

      } catch (error){
        messageStore.showMessageErrors("Ha ocurrido un error al enviar el correo.");
      }
  
};

function setupTrabajoRealizadoInformes(route){
    id.value = route.params.id || null;
    tipo.value = route.params.tipo || null;
    onMounted(() => {
      if (tipo.value === 'aviso') {
        obtenerTrabajoRealizadoPorAvisoIdInformes(id.value);
      }else{
        obtenerTrabajoRealizadoPorObraIdInformes(id.value);
      }

    });

    onUnmounted(() => {
        trabajo_realizado_aviso.value = [];
        trabajo_realizado_obra.value = [];
    });

}


  
export {
    trabajo_realizado_aviso,
    trabajo_realizado_obra,
    tipo,
    generarPDF,
    enviarCorreo,
    setupTrabajoRealizadoInformes,

};






















































// const pdfUrl = ref(null); // Para almacenar la URL del PDF

// const generarPDF = async () => {
//   const content = document.getElementById("pdf-content"); // Capturamos el div

//   // Configuramos html2pdf
//   const opt = {
//     margin: 10,
//     filename: "presupuesto.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 3 },
//     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//   };

//   // Convertimos el HTML en PDF y obtenemos el Blob
//   const pdfBlob = await html2pdf().from(content).set(opt).outputPdf("blob");

//   // Creamos una URL para mostrar el PDF en la app
//   pdfUrl.value = URL.createObjectURL(pdfBlob);
// };

// const descargarPDF = () => {
//   if (pdfUrl.value) {
//     const link = document.createElement("a");
//     link.href = pdfUrl.value;
//     link.download = "presupuesto.pdf";
//     link.click();
//   }
// };