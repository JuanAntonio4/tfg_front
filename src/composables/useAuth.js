import { ref } from "vue";

// Referencia reactiva para almacenar el usuario logueado
const user = ref(null);

// Métodos para manejar el usuario
const setUser = (userData) => {
  user.value = userData;
  localStorage.setItem("user", JSON.stringify(userData)); // Persistir en localStorage
};

const clearUser = () => {
  user.value = null;
  localStorage.removeItem("user"); // Eliminar del localStorage
};

const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");

  // Si el valor no es null o vacío, intentar parsearlo
  if (storedUser && storedUser !== 'undefined' && storedUser !== '') {
    try {
      user.value = JSON.parse(storedUser);
      console.log("Usuario cargado desde localStorage:", user.value);
    } catch (error) {
      console.error("Error al parsear usuario desde localStorage:", error);
      localStorage.removeItem("user"); // Elimina el valor corrupto
      user.value = null; // Asegura que el usuario sea null si hubo un error
    }
  } else {
    console.log("No se encontró usuario en localStorage.");
  }
};

// Cargar el usuario al iniciar la aplicación
loadUserFromStorage();

export function useAuth() {
  return { user, setUser, clearUser };
}