function validarNombre(nombre) {
  return typeof nombre === "string" && nombre.trim().length > 0;
}

function validarApellido(apellido) {
  return typeof apellido === "string" && apellido.trim().length > 0;
}

function validarEdad(edad) {
  return typeof edad === "number" && edad >= 0 && edad <= 120;
}

function validarDNI(dni) {
  return (
    typeof dni === "string" && dni.length === 9 && isNaN(dni[dni.length - 1])
  );
}

module.exports = {
  validarNombre,
  validarApellido,
  validarEdad,
  validarDNI,
};
