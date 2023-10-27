// Obtener la fecha actual del sistema
const fechaActual = new Date();

// Definir la fecha pasada (ejemplo: 15 de mayo de 2020)
const fechaPasada = new Date(2023, 5, 15); // Los meses en JavaScript se indexan desde 0 (enero = 0)

// Calcular la diferencia en milisegundos
const diferenciaMilisegundos = fechaActual - fechaPasada;

// Calcular la diferencia en días
const milisegundosPorDia = 24 * 60 * 60 * 1000; // 24 horas x 60 minutos x 60 segundos x 1000 milisegundos
let diferenciaDias = Math.floor(diferenciaMilisegundos / milisegundosPorDia);

// Convertir a meses si la diferencia es mayor a 30 días
let diferenciaMeses = 0;
if (diferenciaDias > 30) {
  diferenciaMeses = Math.floor(diferenciaDias / 30);
  diferenciaDias %= 30;
}

// Convertir a años si la diferencia es mayor a 12 meses
let diferenciaAnios = 0;
if (diferenciaMeses > 12) {
  diferenciaAnios = Math.floor(diferenciaMeses / 12);
  diferenciaMeses %= 12;
}

console.log('Diferencia en días:', diferenciaDias);
console.log('Diferencia en meses:', diferenciaMeses);
console.log('Diferencia en años:', diferenciaAnios);
