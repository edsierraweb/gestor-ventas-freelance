let clientes = [];
let continuar = true;

//cliente 1 creado
clientes.push({
  nombre: "Gourmet Supply",
  telefono: 3003445678,
  email: "info@gourmetsupply.com",
  representante: "Mónica Pareja",
  estado: "Seguimiento 1",
});

//cliente 2 creado
clientes.push({
  nombre: "Clink",
  telefono2: 3003447890,
  email: "info@clink.com",
  representante: "Carolina Gil",
  estado: "Seguimiento 1",
});

//Función para registrar los clientes
function registrarCliente() {
  let nombre = prompt("Ingrese el nombre del negocio:");
  let telefono = prompt("Ingrese el teléfono del negocio:");
  let email = prompt("Ingrese el email del negocio:");
  let representante = prompt("Ingrese el nombre del representante:");

  let cliente = {
    nombre: nombre,
    telefono: telefono,
    email: email,
    representante: representante,
    estado: "Se agenda reunión",
  };

  clientes.push(cliente);
  alert("¡Cliente registrado exitosamente!");
}

//Función para consultar los clientes
function consultarClientes() {
  if (clientes.length === 0) {
    alert("No hay clientes registrados aún.");
  } else {
    let mensaje = "=== LISTA DE CLIENTES ===\n\n";
    for (let i = 0; i < clientes.length; i++) {
      mensaje += "Nombre del negocio: " + clientes[i].nombre + "\n";
      mensaje += "Nombre representante: " + clientes[i].representante + "\n";
      mensaje += "Teléfono: " + clientes[i].telefono + "\n";
      mensaje += "Email: " + clientes[i].email + "\n";
      mensaje += "Estado: " + clientes[i].estado + "\n";
      mensaje +=
        "-------------------------------------------------------------" +
        "\n\n";
    }

    alert(mensaje);
  }
}

//ciclo while para mostrar en la pantalla el menú del sistema
while (continuar) {
  let opcion = prompt(
    "=== SISTEMA DE CLIENTES POTENCIALES ===\n\n" +
      "1. Registrar nuevo cliente\n" +
      "2. Ver todos los clientes\n" +
      "3. Salir\n\n" +
      "Elige una opción:",
  );
  if (opcion === "1") {
    registrarCliente();
  } else if (opcion === "2") {
    consultarClientes();
  } else if (opcion === "3") {
    alert("¡Gracias por usar el sistema! Hasta pronto.");
    continuar = false;
  } else {
    alert("Opción no válida. Por favor seleccione 1, 2 o 3.");
  }
}
