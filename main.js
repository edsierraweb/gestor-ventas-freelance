// CONFIGURACIÓN DEL PROGRAMA ==================================
const LLAVE_STORAGE = "clientesPotenciales";

const ESTADOS = [
  "Primer contacto con el cliente",
  "Cotización enviada - Seguimiento 1",
  "Cliente no ha dado respuesta - Seguimiento 2",
  "Cliente aprueba el Servicio",
  "Cliente no aprueba el Servicio - Dormido",
];

// DOM =====================
const formCliente = document.getElementById("formCliente");
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputRepresentante = document.getElementById("representante");
const listaEstado = document.getElementById("estado");

const btnReset = document.getElementById("btnReset");
const mensaje = document.getElementById("mensaje");

const filtroEstado = document.getElementById("filtroEstado");
const listaClientes = document.getElementById("listaClientes");

// Buscador + resumen
const buscadorNombre = document.getElementById("buscadorNombre");
const btnBuscar = document.getElementById("btnBuscar");
const resumenClientes = document.getElementById("resumenClientes");

// DATA =====================
//Array clientes
let clientes = [];

// STORAGE =====================
function guardarEnStorage() {
  const json = JSON.stringify(clientes);
  localStorage.setItem(LLAVE_STORAGE, json);
}

async function cargarDeStorage() {
  const data = localStorage.getItem(LLAVE_STORAGE);
  if (data) {
    clientes = JSON.parse(data);
    mostrarMensaje("Datos cargados desde storage ✅");
  } else {
    try {
      const response = await fetch("./clientes.json");
      const dataJson = await response.json();
      clientes = dataJson;
      guardarEnStorage();
      mostrarMensaje("Datos iniciales cargados desde JSON ✅");
    } catch (error) {
      mostrarMensaje("Error al cargar clientes iniciales ❌");
    }
  }
}

// MENSAJES, CARGUE DE LISTA Y  =====================
function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);
}

function mostrarMensajeAlert(texto) {
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = "";
  }, 2000);

  Swal.fire({
    title: "Gestor de Proyectos Freelance",
    text: texto,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

function cargarListaEstados() {
  // Cargar la lista del formulario
  listaEstado.innerHTML = "";
  ESTADOS.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado;
    listaEstado.appendChild(option);
  });

  // Lista del filtro
  filtroEstado.innerHTML = "";

  const optionTodos = document.createElement("option");
  optionTodos.value = "TODOS";
  optionTodos.textContent = "Todos";
  filtroEstado.appendChild(optionTodos);

  ESTADOS.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = estado;
    filtroEstado.appendChild(option);
  });
}

// REDUCE (RESUMEN)=====================
function calcularResumenClientes() {
  const conteo = clientes.reduce((acc, cliente) => {
    if (acc[cliente.nombre]) {
      acc[cliente.nombre] = acc[cliente.nombre] + 1;
    } else {
      acc[cliente.nombre] = 1;
    }
    return acc;
  }, {});

  return conteo;
}

function renderResumenClientes() {
  const total = clientes.length;

  let nombres = "—";
  if (total > 0) {
    nombres = clientes.map((c) => c.nombre).join(", ");
  }

  resumenClientes.textContent = `Clientes: ${total} | Nombres: ${nombres}`;
}

// RENDERIZADO=====================
function crearCardCliente(cliente) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = cliente.id;

  const top = document.createElement("div");
  top.className = "top";

  const titulo = document.createElement("div");
  titulo.innerHTML = `<strong>${cliente.nombre}</strong>`;

  const estadoActual = document.createElement("div");
  estadoActual.innerHTML = `<span class="meta">${cliente.estado}</span>`;

  top.appendChild(titulo);
  top.appendChild(estadoActual);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `
    <div><strong>Representante:</strong> ${cliente.representante}</div>
    <div><strong>Tel:</strong> ${cliente.telefono}</div>
    <div><strong>Email:</strong> ${cliente.email}</div>
  `;

  const acciones = document.createElement("div");
  acciones.className = "accionesCard";

  // Cambiar estado
  const select = document.createElement("select");
  ESTADOS.forEach((e) => {
    const opt = document.createElement("option");
    opt.value = e;
    opt.textContent = e;
    if (e === cliente.estado) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener("change", (event) => {
    actualizarEstado(cliente.id, event.target.value);
  });

  // Eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.className = "btnEliminar";
  btnEliminar.addEventListener("click", () => {
    eliminarCliente(cliente.id);
  });

  acciones.appendChild(select);
  acciones.appendChild(btnEliminar);

  card.appendChild(top);
  card.appendChild(meta);
  card.appendChild(acciones);

  return card;
}

function renderClientes() {
  listaClientes.innerHTML = "";

  const estadoSeleccionado = filtroEstado.value;

  // Filtrar por estado (si aplica)
  let lista = clientes;
  if (estadoSeleccionado !== "TODOS") {
    lista = clientes.filter((c) => c.estado === estadoSeleccionado);
  }

  if (lista.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay clientes para mostrar.";
    p.className = "meta";
    listaClientes.appendChild(p);
    renderResumenClientes();
    return;
  }

  lista.forEach((cliente) => {
    const card = crearCardCliente(cliente);
    listaClientes.appendChild(card);
  });

  renderResumenClientes();
}

function renderSoloCliente(cliente) {
  listaClientes.innerHTML = "";

  if (!cliente) {
    const p = document.createElement("p");
    p.textContent = "No se encontró ningún cliente con ese nombre.";
    p.className = "meta";
    listaClientes.appendChild(p);
    renderResumenClientes();
    return;
  }

  const card = crearCardCliente(cliente);
  listaClientes.appendChild(card);

  renderResumenClientes();
}

// FUNCIONES DEL PROGAMA/SIMULADOR ============================================================
function crearCliente(nombre, telefono, email, representante, estado) {
  return {
    id: Date.now(),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    email: email.trim(),
    representante: representante.trim(),
    estado: estado,
  };
}

function agregarCliente(cliente) {
  clientes.push(cliente);
  guardarEnStorage();
  renderClientes();
}

function actualizarEstado(id, nuevoEstado) {
  const cliente = clientes.find((c) => c.id === id);
  if (cliente) {
    cliente.estado = nuevoEstado;
    guardarEnStorage();
    renderClientes();
    mostrarMensaje("Estado actualizado ✅");
  }
}

function eliminarCliente(id) {
  Swal.fire({
    title: "¿Eliminar cliente?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      clientes = clientes.filter((c) => c.id !== id);
      guardarEnStorage();
      renderClientes();

      Swal.fire({
        title: "Eliminado",
        text: "El cliente fue eliminado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      mostrarMensaje("Cliente eliminado ✅");
    }
  });
}

function resetearSistema() {
  Swal.fire({
    title: "¿Resetear sistema?",
    text: "Se eliminarán los datos guardados y se volverán a cargar los clientes iniciales.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, resetear",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      localStorage.removeItem(LLAVE_STORAGE);
      clientes = [];

      await cargarDeStorage();
      renderClientes();

      Swal.fire({
        title: "Sistema reseteado",
        text: "Los datos iniciales se cargaron correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      mostrarMensaje("Storage reiniciado ✅");
    }
  });
}

// BUSCADOR (FIND)==========================================================
function buscarClientePorNombre(texto) {
  const textoLimpio = texto.trim().toLowerCase();

  const encontrado = clientes.find((c) => {
    return c.nombre.toLowerCase().includes(textoLimpio);
  });

  return encontrado; // elemento o undefined
}

// EVENTOS======================================================================
formCliente.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = inputNombre.value;
  const telefono = inputTelefono.value;
  const email = inputEmail.value;
  const representante = inputRepresentante.value;
  const estado = listaEstado.value;

  if (!nombre || !telefono || !email || !representante) {
    mostrarMensaje("Completa todos los campos.");
    return;
  }

  const cliente = crearCliente(nombre, telefono, email, representante, estado);
  agregarCliente(cliente);

  formCliente.reset();
  listaEstado.value = ESTADOS[0];
  mostrarMensajeAlert("Cliente agregado ✅");
});

btnReset.addEventListener("click", () => {
  resetearSistema();
});

filtroEstado.addEventListener("change", () => {
  renderClientes(); // Cuando el filtro cambie, actualiza la lista de clientes en pantalla.
});

// Buscar (click)
btnBuscar.addEventListener("click", () => {
  const texto = buscadorNombre.value;

  if (texto.trim() === "") {
    renderClientes();
    return;
  }

  const cliente = buscarClientePorNombre(texto);
  renderSoloCliente(cliente);
});

// Si borran el texto, vuelve a la lista normal
buscadorNombre.addEventListener("keyup", (event) => {
  if (event.target.value.trim() === "") {
    renderClientes();
  }
});

// INICIAR ===================================================================
async function iniciarApp() {
  cargarListaEstados();
  await cargarDeStorage();
  renderClientes();
}

iniciarApp();
