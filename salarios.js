function analisisSalarial(opcion) {
   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      //alert(this.readyState);
      // alert("entro");
      if (xhttp.readyState == 4 && xhttp.status == 200) {
         arrayData = JSON.parse(xhttp.responseText);
         arrayData = Object.values(arrayData).map(v => v.Salarios);
         arrayData = arrayData.map(Number);
         arrayData.sort(function (a, b) {
            return a - b;
         });

         //let resultado = "hola pablo";

         let lenghtArrayData = arrayData.length;
         // alert(lenghtArrayData);

         const distinctNumeros = Array.from(new Set(arrayData));

         let arrRepeticionesPorNumero = [];
         for (let i = 0; i < distinctNumeros.length; i++) {
            arrRepeticionesPorNumero[i] = (arrayData.filter(element => element === distinctNumeros[i])).length;
         }
         let numeroMaximo = Math.max.apply(null, arrRepeticionesPorNumero);

         let numerosModa = [];
         for (let i = 0; i <= arrRepeticionesPorNumero.length; i++) {
            if (arrRepeticionesPorNumero[i] === numeroMaximo) {
               numerosModa.push(distinctNumeros[i]);
            }
         };


         let numeroRegistrosData = ` El número de Registros del archivo JSON es de: ${arrayData.length} `;
         let maximoSalarioDeclarado = ` El Máximo Salario Declarado es ${Math.max.apply(null, arrayData)} `;
         let minimoSalarioDeclarado = ` El Mínimo Salario Declarado es ${Math.min.apply(null, arrayData)} `;
         let sumaTodosLosSalarios = `La suma de todos los salarios es ${arrayData.reduce((a, b) => a + b, 0)}`;

         let Promedio = `El PROMEDIO es ${(arrayData.reduce((a, b) => a + b, 0))/arrayData.length}`;
         let Mediana =
            arrayData.length % 2 === 0 ? `La MEDIANA es ${((arrayData[arrayData.length / 2 - 1] + arrayData[arrayData.length / 2]) / 2)}` :
            arrayData.length % 2 != 0 ? `La MEDIANA es ${arrayData[parseInt(arrayData.length/2)]}` : "";
         let Moda = (numerosModa.length === 1) ? `La MODA es el salario ${numerosModa[0]} con ${numeroMaximo} repeticiones` :
            (numerosModa.length > 1) ? `La MODA es de los salarios ${numerosModa} con ${numeroMaximo} repeticiones` : "";

         //Análisis Banco Mundial y DataSet DANE
         const promedio_Dolar_Peso_2021 = Number(3743);
         let arrayIngresoBajo_BM = [];
         let arrayIngresoMedianoBajo_BM = [];
         let arrayIngresoMedianoAlto_BM = [];
         let arrayIngresoAlto_BM = [];


         for (let i = 0; i <= arrayData.length; i++) {

            switch (true) {
               case arrayData[i] <= (1025 * promedio_Dolar_Peso_2021):
                  arrayIngresoBajo_BM.push(arrayData[i]);
                  break;
               case arrayData[i] >= 1026 * promedio_Dolar_Peso_2021 && arrayData[i] <= 3995 * promedio_Dolar_Peso_2021:
                  arrayIngresoMedianoBajo_BM.push(arrayData[i]);
                  break;
               case arrayData[i] >= 3996 * promedio_Dolar_Peso_2021 && arrayData[i] <= 12375 * promedio_Dolar_Peso_2021:
                  arrayIngresoMedianoAlto_BM.push(arrayData[i]);
                  break;
               case arrayData[i] > 12375:
                  arrayIngresoAlto_BM.push(arrayData[i]);
                  break;

            }

         }


         let analisisBancoMundial = `
            <p> <strong> ANÁLISIS CON PARÁMETROS INGRESO BANCO MUNDIAL </strong> </p>
            <h4> El Banco Mundial tiene 4 ingresos: ingreso bajo, mediano bajo, mediano alto e ingreso alto </h4>
            <h4> La distribución de los ingresos del Data Set del DANE adaptada a los Ingresos del Banco Mundial queda así </h4>
            <h4> Total Registros del Data Set ${arrayData.length}.</h4>
            <a href="./img/ingresosBancoMundial.PNG">Ver distribuciones</a> 
            `;

         let ingresosBajosBM = `
         Total Registros de Salarios como Ingresos Bajos ${arrayIngresoBajo_BM.length} registros, que son el ${arrayIngresoBajo_BM.length*100/lenghtArrayData} % del total.
         `;

         let ingresosMedianoBajoBM = `
         Total Registros de Salarios como Ingreso Mediano Bajo ${arrayIngresoMedianoBajo_BM.length} registros, que son el ${(arrayIngresoMedianoBajo_BM.length*100)/lenghtArrayData} % del total.
         `;
         let ingresosMedianoAltoBM = `
         Total Registros de Salarios como Ingreso Mediano Alto ${arrayIngresoMedianoAlto_BM.length} registros, que son el ${(arrayIngresoMedianoAlto_BM.length*100)/lenghtArrayData} % del total.  
         `;

         let ingresosAltosBM = ` 
         Total Registros de Salarios como Ingresos Bajos ${arrayIngresoAlto_BM.length} registros, que son el ${(arrayIngresoAlto_BM.length*100)/lenghtArrayData} % del total.
         `;

         //Analisis Segmentando por Salario Mínimo


         let arraySM_Col = [];

         for (let i = 0; i <= arrayData.length; i++) {
            if (arrayData[i] > 0) {
               if (arrayData[i] >= 900000 && arrayData[i] <= 909000) {
                  arraySM_Col.push(908526);
               } else {
                  arraySM_Col.push(arrayData[i]);
               }
            }
         }

         //alert(arraySM_Col);


         let posSegmentoSalarioMinimoCol = 0;
         let segmentosxMaximoSalarioDeclarado = parseInt(Math.max.apply(null, arraySM_Col) / 908526) + 1;
         let smCol2021 = 908526;
         let lenghtArraySM_Col = arraySM_Col.length;

         let arrNumeroSalariosMinimosCol = new Array(segmentosxMaximoSalarioDeclarado);
         let arrSumaValorSalariosMinimosCol = new Array(segmentosxMaximoSalarioDeclarado);

         arrNumeroSalariosMinimosCol.fill(0, 0);
         arrSumaValorSalariosMinimosCol.fill(0, 0);
         arrNumeroSalariosMinimosCol = arrNumeroSalariosMinimosCol.map(Number);
         arrSumaValorSalariosMinimosCol = arrSumaValorSalariosMinimosCol.map(Number);

        /*  alert(arrSumaValorSalariosMinimosCol);
         alert(arrNumeroSalariosMinimosCol);
 */

         /* alert(segmentosxMaximoSalarioDeclarado);
         alert(arrSumaValorSalariosMinimosCol);
         alert(arrNumeroSalariosMinimosCol);
         alert(arrSumaValorSalariosMinimosCol.length);
         alert(arrNumeroSalariosMinimosCol.length); */


         switch (opcion) {
            case 1:
               // alert("entro en el switch");
               resultado = `
               ${numeroRegistrosData},<br>
               ${maximoSalarioDeclarado},<br>
               ${minimoSalarioDeclarado},<br>
               ${sumaTodosLosSalarios},<br>
               ${Promedio},<br>
               ${Mediana},<br>
               ${Moda}
               `;
               document.getElementById("analisisDatos").innerHTML = resultado;
               break;

            case 2:
               resultado = `
               ${analisisBancoMundial} <br>
               ${ingresosBajosBM} <br>
               ${ingresosMedianoBajoBM} <br>
               ${ingresosMedianoAltoBM} <br>
               ${ingresosAltosBM}
             
            `
               document.getElementById("analisisDatos").innerHTML = resultado;
               break;

            case 3:
               // alert("hola pablo");
               resultado = "";
               for (let i = 0; i <= arrayData.length; i++) {
                  resultado = resultado + " " + arrayData[i] + `<br>`;
               }

               document.getElementById("analisisDatos").innerHTML = resultado;
               break;

            case 4:

               // alert("hola 4");


               for (let i = 0; i <= arraySM_Col.length; i++) {
                  posSegmentoSalarioMinimoCol = parseInt(arraySM_Col[i] / 908526);
                  arrSumaValorSalariosMinimosCol[posSegmentoSalarioMinimoCol] = arraySM_Col[i] + arrSumaValorSalariosMinimosCol[posSegmentoSalarioMinimoCol];
                  arrNumeroSalariosMinimosCol[posSegmentoSalarioMinimoCol] = arrNumeroSalariosMinimosCol[posSegmentoSalarioMinimoCol] + 1;
               }

               /*  alert(arrSumaValorSalariosMinimosCol);
               alert(arrNumeroSalariosMinimosCol);

               alert(arrSumaValorSalariosMinimosCol[39]);
               alert(arrNumeroSalariosMinimosCol[39]);

               alert(arrSumaValorSalariosMinimosCol.lenght);
               alert(arrNumeroSalariosMinimosCol.lenght);
 */
               let arrayResultadosSMCol = [];
               arrayResultadosSMCol[0] = "SEGMENTACIÓN POR SALARIO MÍNIMO DE COLOMBIA 2021 <br>";
               arrayResultadosSMCol[1] = "Nota: Aquí el PROMEDIO por Segmentación por Salario Mínimo adquiere relevancia por ser datos homogeneos <br>";
               arrayResultadosSMCol[2] = `El total de registros es ${arraySM_Col.length} <br>`;
               arrayResultadosSMCol[3] = ` <br>`;

              /*  alert(arrayResultadosSMCol); */

               for (let i = 0; i <= segmentosxMaximoSalarioDeclarado; i++) {
                  arrayResultadosSMCol.push(`Segmento ${i} de ${i}  a  ${i+1} salarios mínimos ( ${i*smCol2021} -- ${(i+1)*smCol2021}). 
                  ${arrNumeroSalariosMinimosCol[i]} registros, que corresponden al 
                  ${(arrNumeroSalariosMinimosCol[i]*100)/lenghtArraySM_Col} %  . El PROMEDIO del salario en este SEGMENTO es
                  ${arrSumaValorSalariosMinimosCol[i]/arrNumeroSalariosMinimosCol[i]}  <br>
                  
                  `)
               }

               /* alert(arrayResultadosSMCol.lenght);
               alert(arrayResultadosSMCol); */

               resultado = "<br>";
               for (let i = 0; i <= arrayResultadosSMCol.length; i++) {
                  resultado = resultado + " " + arrayResultadosSMCol[i];
               }


               document.getElementById("analisisDatos").innerHTML = resultado;
               break;

            case 5:
               resultado = "";
               for (let i = 0; i <= arraySM_Col.length; i++) {
                  resultado = resultado + " " + arraySM_Col[i] + `<br>`;
               }

               document.getElementById("analisisDatos").innerHTML = resultado;
               break;

         }


         //document.getElementById("analisisDatos").innerHTML = resultado;
      } else {
         document.getElementById("analisisDatos").innerHTML = "no hay conexión";
      }

   }

   xhttp.open("GET", "./json/salarios.json", true);
   xhttp.send();
}

function porcentaje(lenghtArrayMuestra, lenghtArrayData) {
   let resultado = (lenghtArrayMuestra * 100) / lenghtArrayData;
   return resultado;
}


function fuentesDatos() {

   let resultado = `
   <h2> FUENTES DE DATOS <h2>
   
   <h3> DATASETS Salarios, Fuente: DANE - Gran Encuesta de Hogares </h3>
   <a href='https://microdatos.dane.gov.co/index.php/catalog/701/get_microdata'>Fuente del Dataset DANE</a>

   <h3> Histórico Salario Mínimo Colombia hasta el 2021, Fuente: Ministerio de Educación -  </h3>
   <a href='https://ole.mineducacion.gov.co/1769/w3-article-388408.html?_noredirect=1'>Histórico Salario Mínimo Colombia</a>
   
   <h3> Clasificación Nivel de Ingresos por País, Fuente: Banco Mundial -  </h3>
   <a href='https://blogs.worldbank.org/es/opendata/nueva-clasificacion-de-los-paises-segun-el-nivel-de-ingresos-para-2019-y-2020'>BM Ingresos por país</a>

   <h3> Salarios, Fuente: Banco de la República -  </h3>
   <a href='https://www.banrep.gov.co/es/estadisticas/salarios'>BR Estadísticas Salarios Colombia</a>

   <h3> Prómedio Valor del Dolar en Pesos Colombia 2021, Fuente: Internet - </h3>
   <a href='https://dolar.wilkinsonpc.com.co/dolar-historico/dolar-historico-2021.html#:~:text=Listado%20por%20d%C3%ADas%20del%20D%C3%B3lar%20Hist%C3%B3rico%20del%20A%C3%B1o,de%20Enero%20del%202021.%20Promedio.%20%24%203%2C743.09.%20'>Internet Prómedio Dolar en Colombia Año 2021</a>

   `;

   document.getElementById("analisisDatos").innerHTML = resultado;

}


function medidasDelBancoMundial() {

   let resultado = `
   <h2> Umbral de Valoración del Banco Mundial, vigente para el 2021 </h2>
   <h3> Vamos a hacer un análisis con los ingresos propuestos por el Banco Mundial </h3>
   <h3> Determinaremos si el análisis explica la realidad para Colombia </h3>
   <img src='./img/ingresosBancoMundial.PNG'>
   `;
   document.getElementById("analisisDatos").innerHTML = resultado;
}

function analisisSalarialGeneral() {

   analisisSalarial(1);
}

function analisisBancoMundial() {
   analisisSalarial(2);
}

function comentariosBancoMundial() {
   let resultado = `
      <h2> Comentarios al análisis por ingresos del Banco Mundial <h2>
      <h3> Los "umbrales" o segmentaciones del Banco Mundial no explican bien el poder adquisitivo de los salarios en Colombia <h3>
      <h3> Esta construido para países industrializados, de muy altos ingresos por salarios <h3>
      <h3> La muestra representativa del DANE da MÁS del 95% como umbral de ingresos bajos, y eso no es la realidad en nuestro país <h3>
      <h3> En el segmento ingresos bajos son US1025 o menos, eso da $3'836.575 pesos del 2021 que no es exactamente un ingreso bajo en Colombia,
      entre otras cosas porque ese es el salario de muchos profesionales en Colombia, aunque claro
      si es un salario muy bajo en un país industrializado.
      por lo tanto no explica bien el salario en Colombia </h3>
      <h3> Hay otros países donde su situación económica no lo explica tampoco el umbral de ingresos bajos,
      pues habría que subdividirlo en 6 o 8 segmentos adicionales <h3>
      <h3> Lo que mejor explicaria el salario en Colombia es una SEGMENTACIÓN POR SALARIOS MÍNIMOS, porque al menos ya se sabe
      que poder adquisitivo tiene dentro de la economía Colombiana 1 salario mínimo <h3>
      
   `;
   document.getElementById("analisisDatos").innerHTML = resultado;
}

function visualizarTodoElArray() {
   analisisSalarial(3);
}

function segmentandoSalarioMinimoColombia() {
   analisisSalarial(4);
}

function visualizarTodoElArrayFiltrado() {
   analisisSalarial(5);
}

function tratamientoDatosSM_Col() {
   let resultado = `

   <h3>Transformaciones y Limpiezas de Datos Aplicados.  Objetivo del análisis.</h3>
   <h2> - Se transformara los salarios entre $900.000 y $909.000 a UN Salario Mínimo de $908.526 del 2021</h2>
   <h2> - Se borran los salarios declarados como cero 0</h2>
   <h2> PROCESOS </h2>
   <h2> * Se buscará como objetivo segmentar los salarios mínimos por grupos de 1,2,3 ... salarios mínimos </h2>
   <h2> * Se establecerá el porcentaje de cada grupo respecto a la muestra total </h2>
   `;

   document.getElementById("analisisDatos").innerHTML = resultado;
}