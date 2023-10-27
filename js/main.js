"use strict"

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const day_per_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 ,31];

let formulario = document.querySelector("#formulario");

//ELEMENTOS (PRIMER DIV)
let inputs_error_dia = document.querySelector(".input_dia");
let label_error_dia = document.querySelector(".label_dia");
let parrafo_error_dia = document.querySelector(".error_dia");

let inputs_error_mes = document.querySelector(".input_mes");
let label_error_mes = document.querySelector(".label_mes");
let parrafo_error_mes = document.querySelector(".error_mes");

let inputs_error_anio = document.querySelector(".input_anio");
let label_error_anio = document.querySelector(".label_anio");
let parrafo_error_anio = document.querySelector(".error_anio");

//DIGITOS (SEGUNDO DIV)
let span_anio = document.querySelector(".digitos_anio");
let span_mes = document.querySelector(".digitos_mes");
let span_dia = document.querySelector(".digitos_dia");

let introducir_digitos_anio;
let introducir_digitos_mes;
let introducir_digitos_dia;

//Validar fechas 
let dia_correcto = false;
let mes_correcto = false;
let anio_correcto = false;

window.addEventListener("load", ()=>{
        
    formulario.addEventListener("submit", ()=>{
        //Variables que recogen los inputs
        let input_day = document.querySelector(".input_dia").value;
        let input_month = document.querySelector(".input_mes").value;
        let input_year = document.querySelector(".input_anio").value;
        
        if (input_day.length == 0){
            saltarErrorEmpty(saltarErrorDia());
            dia_correcto = false;
        }else if (parseInt(input_day) > 31 || parseInt(input_day) < 0 || isNaN(input_day)) {
            saltarErrorDiaInvalido(saltarErrorDia());
        }else{
            restaurarErrorDia();
            dia_correcto = true;
        }

        if (input_month.length == 0){
            saltarErrorEmpty(saltarErrorMes());
            mes_correcto = false;
        }else if (parseInt(input_month) > 12 || parseInt(input_month) < 0 || isNaN(input_month)) {
            saltarErrorMesInvalido(saltarErrorMes());
        }else{
            restaurarErrorMes();
            mes_correcto = true;
        }

        if (input_year.length == 0){
            saltarErrorEmpty(saltarErrorAnio());
            anio_correcto = false;
        }else if (parseInt(input_year) < 0 || parseInt(input_year) > year || isNaN(input_year)) {
            saltarErrorAnioInvalido(saltarErrorAnio());
        }else{
            restaurarErrorAnio();
            anio_correcto = true;
        }

        if (dia_correcto && mes_correcto && anio_correcto) {
            if (!verificarFecha(date, input_day, input_month, input_year)){
                //formulario.append("Fecha Posterior a la actual");
                alert("No puedes introducir una fecha posterior a la del sistema");
            }else{
                calcularFecha(input_day, input_month, input_year);
            }
        }
    });
}); 

//Guardar estilos elementos iniciales (Elijo dia, pero todos los estilos son comunes a los 3 campos)
const estilosInicialesPrimerDiv = {
    border: inputs_error_dia.style.border,
    color: label_error_dia.style.color,
    display: parrafo_error_dia.style.display
}


//Posibles errores día
function saltarErrorDia() {
    inputs_error_dia.style.border = "1px solid #FA9EA4";
    label_error_dia.style.color = "#FA9EA4";
    parrafo_error_dia.style.display = "block";
    return parrafo_error_dia;

}

function saltarErrorDiaInvalido(parrafo_error){
    parrafo_error.innerHTML = "Must be a valid day";
    dia_correcto = false;
}

//Posibles errores mes
function saltarErrorMes() {
    inputs_error_mes.style.border = "1px solid #FA9EA4";
    label_error_mes.style.color = "#FA9EA4";
    parrafo_error_mes.style.display = "block";
    return parrafo_error_mes;
}

function saltarErrorMesInvalido(parrafo_error){
    parrafo_error.innerHTML = "Must be a valid month";
    mes_correcto = false;
}

//Posibles errores año
function saltarErrorAnio() {
    inputs_error_anio.style.border = "1px solid #FA9EA4";
    label_error_anio.style.color = "#FA9EA4";
    parrafo_error_anio.style.display = "block";
    return parrafo_error_anio;
}

function saltarErrorAnioInvalido(parrafo_error){
    parrafo_error.innerHTML = "Must be in the past";
    anio_correcto = false;
}

// Error Campos Vacíos (Común a todos los campos)
function saltarErrorEmpty(parrafo_error){
    parrafo_error.innerHTML = "This fild is required";
}

function restaurarErrorDia(){
    inputs_error_dia.style.border = estilosInicialesPrimerDiv.border;
    label_error_dia.style.color = estilosInicialesPrimerDiv.color;
    parrafo_error_dia.style.display = estilosInicialesPrimerDiv.display;
}

function restaurarErrorMes(){
    inputs_error_mes.style.border = estilosInicialesPrimerDiv.border;
    label_error_mes.style.color = estilosInicialesPrimerDiv.color;
    parrafo_error_mes.style.display = estilosInicialesPrimerDiv.display;
}

function restaurarErrorAnio(){
    inputs_error_anio.style.border = estilosInicialesPrimerDiv.border;
    label_error_anio.style.color = estilosInicialesPrimerDiv.color;
    parrafo_error_anio.style.display = estilosInicialesPrimerDiv.display;
}

function calcularFecha(input_day, input_month, input_year){
    input_day = parseInt(input_day);
    input_month = parseInt(input_month);
    input_year = parseInt(input_year);
    if (input_day > day){
        day = day + day_per_months[month-1];
        month = month - 1;
    }

    if (input_month > month){
        month = month + 12;
        year = year - 1;
    }
    const digito_day = day - input_day; 
    const digito_month = month - input_month; 
    const digito_year = year - input_year;
    
    span_dia.innerHTML = digito_day;
    span_mes.innerHTML = digito_month;
    span_anio.innerHTML = digito_year;
}


function verificarFecha(fechaActual, input_day, input_month, input_year) {
    input_day = parseInt(input_day);
    input_month = parseInt(input_month);
    input_year = parseInt(input_year);
    let fechaIngresada = new Date(input_year, (input_month-1), input_day);
    console.log(fechaIngresada, fechaActual);
    if (fechaIngresada <= fechaActual) {
      return true;
    } else if (fechaIngresada > fechaActual) {
      return false;
  }
}