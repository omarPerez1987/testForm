const {
  validarNombre,
  validarApellido,
  validarEdad,
  validarDNI,
} = require("./form");

test("debería validar correctamente un nombre no vacío", () => {
  expect(validarNombre("John")).toBe(true);
});

test("debería fallar al validar un nombre vacío", () => {
  expect(validarNombre("")).toBe(false);
});

test("debería fallar al validar un nombre que no es de tipo string", () => {
  expect(validarNombre(123)).toBe(false);
});

//********************************************** */

test("debería validar correctamente un apellido no vacío", () => {
  expect(validarApellido("Doe")).toBe(true);
});

test("debería fallar al validar un apellido vacío", () => {
  expect(validarApellido("")).toBe(false);
});

test("debería fallar al validar un apellido que no es de tipo string", () => {
  expect(validarApellido(456)).toBe(false);
});


//*********************************************** */
test("debería validar correctamente una edad dentro del rango permitido", () => {
  expect(validarEdad(25)).toBe(true);
});

test("debería fallar al validar una edad negativa", () => {
  expect(validarEdad(-5)).toBe(false);
});

test("debería fallar al validar una edad fuera del rango permitido", () => {
  expect(validarEdad(150)).toBe(false);
});

test("debería fallar al validar una edad que no es de tipo número", () => {
  expect(validarEdad("25")).toBe(false);
});


//**************************************************** */
test("debería validar correctamente un DNI con 9 dígitos", () => {
  expect(validarDNI("12345678R")).toBe(true);
});

test("debería fallar al validar un DNI con longitud incorrecta", () => {
  expect(validarDNI("123")).toBe(false);
});
test("debería fallar al validar un DNI que el último elementos sea un numero", () => {
  expect(validarDNI("123456789")).toBe(false);
});

test("debería fallar al validar un DNI no numérico", () => {
  expect(validarDNI("abcdefgh")).toBe(false);
});

test("debería fallar al validar un DNI que no es de tipo string", () => {
  expect(validarDNI(12345678)).toBe(false);
});
