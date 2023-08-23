import Swal from "sweetalert2";

// Alerta de Éxito
export const alertaExito = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
};
