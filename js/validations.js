//BASE DE DATOS
	var products = ["Antivirus", "Grafica", "Disco duro", "Ordenador", "Bolso portatil", "Portatil", "Memoria RAM", "Router Linux", "Sintonizadora TV"];
	var imgFull = ["img/productos/1.jpg", "img/productos/2.jpg", "img/productos/3.jpg", "img/productos/4.jpg", "img/productos/5.jpg", "img/productos/6.jpg", "img/productos/7.jpg", "img/productos/8.jpg", "img/productos/9.jpg"];
	var img = ["img/productos/1m.jpg", "img/productos/2m.jpg", "img/productos/3m.jpg", "img/productos/4m.jpg", "img/productos/5m.jpg", "img/productos/6m.jpg", "img/productos/7m.jpg", "img/productos/8m.jpg", "img/productos/9m.jpg"];
	var prices = [33, 169, 36, 360, 11, 540, 21, 66, 25];
	var stock = [5, 2, 8, 3, 10, 4, 3, 1, 2];
	var precioTransporte = [6, 12, 20, "gratis"];
	var IVA = 0.18;
	var uniUser;

window.onload = function (){
			//Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
		var div_products = document.getElementsByName("div_products");
		for(i in products){
			div_products[i].innerHTML = '<a id="imgG'+i+'" href="' +imgFull[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +img[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +products[i]+ '</span>:&nbsp;<span id="pre'+i+'">' +prices[i]+ '€</span></b></div><div class="stock">Hay en stock <span id="uni'+i+'">' +stock[i]+ '</span> unidades,<br/>¿Cuantas quiere?: <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';

		}

		var fecha = new Date();
		var anio = fecha.getFullYear();
				
		for (var i=1;i<=31;i++){
			document.getElementById("fechaNacimientoDia").innerHTML = document.getElementById("fechaNacimientoDia").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}
				
		for (var i=anio;i>=(anio-110);i--){
			document.getElementById("fechaNacimientoAnio").innerHTML = document.getElementById("fechaNacimientoAnio").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		//Tarjeta de credito:
		for (var i=1;i<=12;i++){
			document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		for (var i=anio;i<=(anio+21);i++){
			document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		document.getElementById("button_Total").onclick = validaLasUnidades;
		document.getElementById("button_Register").onclick = pideDatos;
		document.getElementById("button_Pay").onclick = validaDatosPersonales;
		document.getElementById("button_Confirm").onclick = validaDatosPago;

}
		/// TODAS LAS FUNCIONES
		//FUNCION DE VALIDACION DE UNIDADES:
	function validaLasUnidades(elEvento) {
		
		var flag = true;
		uniUser = document.getElementsByName("uniUser");
		
		
		for (i in products){
		
			if ( uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0 ){
				
				flag = false;
				uniUser[i].className = "uniMal";
								
				//Modifica el css para quitar los formularios:
				document.getElementById("all").className = "container";
				document.getElementById("layout_main").className = "subcontainer";
				document.getElementById("divZoneBuy").className = "divZonaNotBuy";
				document.getElementById("calculate_Total").className = "calculate_Pay";
/**/			document.getElementById("div_Data").className = "calculate_Pay";
/**/			document.getElementById("div_button_Pay").className = "calculate_Pay";				
				
				//Deshabilita el boton de Registro
				document.getElementById("button_Register").disabled = true;
/**/			document.getElementById("button_Register").disabled = true;
/**/			document.getElementById("button_Register").disabled = true;				
				
				//Con solo un error se para la validacion de unidades:
				return;
			}
			else{
				flag = true;
				uniUser[i].className = "uniBien";
			}
		}

		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de cargar el carro de la compra:
		if (flag){
			calculateTotal();
		}
	}



//FUNCION QUE MUSTRA EL CARRO DE LA COMPRA:
	function calculateTotal(elEvento) {

	
		//Añade el encabezado de la tabla
		document.getElementById("total_Table").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';
	
	
		//Inicializacion de las variables para esta funcion:
		var carroTotal = 0;
		var numProducts = 0;
		
		
		//Muestra el carrito de la compra
		for (i in products){

			var total_Table = document.getElementById("total_Table").innerHTML;
			var preTotal = 0;
		
			
			//Cuenta el numero de productos para saber cuanto costara el transporte
			if (uniUser[i].value != 0){
				numProducts++;
			}
			
			
			if (uniUser[i].value != 0){
			
				//Modifica el css para hacer hueco a los formularios
				document.getElementById("all").className = "todoSi";
				document.getElementById("layout_main").className = "menuSi";
				document.getElementById("divZoneBuy").className = "divZonaCompraSi";
				document.getElementById("calculate_Total").className = "divsSi";
/**/			document.getElementById("div_Data").className = "calculate_Pay";
/**/			document.getElementById("div_button_Pay").className = "calculate_Pay";					
				
				//Habilita el boton de datos personales
				document.getElementById("button_Register").disabled = false;
				
				//Calcula el totalUnidades y rellena el carro de la compra
				preTotal = prices[i] * uniUser[i].value;
				carroTotal = carroTotal + preTotal;
				document.getElementById("total_Table").innerHTML = total_Table + '<tr class="proCarrito"><td>' +products[i]+ '</td><td>' +uniUser[i].value+ '</td><td>' +prices[i]+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
			}
		}
		

		//Se calcula el transporte a pagar segun la cantidad de productos comprados:
		var precioTransporteAPagar;
		if (numProducts <= 2){
			precioTransporteAPagar = precioTransporte[0];
		}
		else if (numProducts <= 3){
			precioTransporteAPagar = precioTransporte[1];
		}
		else if (numProducts <= 4){
			precioTransporteAPagar = precioTransporte[2];
		}
		else if (numProducts >= 5){
			precioTransporteAPagar = precioTransporte[3];
		}

		//Se sacan las cuentas del transporte (si lo hubiese), del iva y el total:
		var totalTransporte = precioTransporteAPagar;
		if(totalTransporte == "gratis"){
			var totalIVA = (carroTotal * IVA);
			var totalAPagar = carroTotal + totalIVA;
		}
		else{
			var totalIVA = ((carroTotal + totalTransporte) * IVA);
			var totalAPagar = carroTotal + totalTransporte + totalIVA;
		}

		
		//Limitar a 2 los decimales a mostrar del IVA:
		totalIVA=totalIVA*100;
		totalIVA=Math.floor(totalIVA);
		totalIVA=totalIVA/100;
		//Limitar a 2 los decimales a mostrar del TOTAL A PAGAR:
		totalAPagar=totalAPagar*100;
		totalAPagar=Math.floor(totalAPagar);
		totalAPagar=totalAPagar/100;		
		
		//Se añade a la tabla el TOTAL que suma el carrito:
		tablaTotal = document.getElementById("tablaTotal").innerHTML;
		document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' +totalTransporte+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +totalIVA+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +totalAPagar+ ' €</b></td></tr>';
	}	
	////////
	/////////
	//////////
	//////////
	///////////
	///////////
	////////////
	/////////////function pideDatos(elEvento) {
		document.getElementById("divDatos").className = "divsSi";
/**/	document.getElementById("divTotal").className = "divsNo";
/**/	document.getElementById("divPago").className = "divsNo";		
		document.getElementById("botonPago").disabled = false;
	}	

	

	
//FUNCION DE VALIDACION DE DATOS PERSONALES:
	function validaDatosPersonales(elEvento) {

		var todoBien = true;
	
	
		 //Nombre:
			var vNombre = document.getElementById("nombre").value;
			if( vNombre == null || vNombre.length == 0 || /^\s+$/.test(vNombre) || !isNaN(vNombre)) {
				todoBien=false;
				document.getElementById("nombre").className = "textMal";
			}
			else{
				document.getElementById("nombre").className = "textBien";
			}	
	
	
		//DNI:	
			var vDNI = document.getElementById("dni").value;
			var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N',
			'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
			
			if( (/^\d{8}[A-Z]$/.test(vDNI)) ) {
				todoBien=false;
				document.getElementById("dni").className = "textMal";
			}
			else{
				document.getElementById("dni").className = "textBien";
			}
			
			
	
	
		//Fecha de nacimiento DIA:
			var vFechaNacimientoDia = document.getElementById("fechaNacimientoDia").selectedIndex;
			if( vFechaNacimientoDia == null || vFechaNacimientoDia == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoDia").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoDia").className = "textBien";
			}
		//Fecha de nacimiento MES:
			var vFechaNacimientoMes = document.getElementById("fechaNacimientoMes").selectedIndex;
			if( vFechaNacimientoMes == null || vFechaNacimientoMes == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoMes").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoMes").className = "textBien";
			}	
		//Fecha de nacimiento AÑO:
			var vFechaNacimientoAnio = document.getElementById("fechaNacimientoAnio").selectedIndex;
			if( vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoAnio").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoAnio").className = "textBien";
			}	
	
	
		//Telefono:
			var vMovil = document.getElementById("movil").value;
			if( !(/^\d{9}$/.test(vMovil))  ) {
				todoBien=false;
				document.getElementById("movil").className = "textMal";
			}
			else{
				document.getElementById("movil").className = "textBien";
			}	
	
	
		//email:
			var vEmail1 = document.getElementById("email1").value;
			var vEmail2 = document.getElementById("email2").value;

			//email 1
			if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1)) ) {
				todoBien=false;
				document.getElementById("email1").className = "textMal";
			}
			else{
				document.getElementById("email1").className = "textBien";
			}
			
			//email 2
			if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2)) ) {
				todoBien=false;
				document.getElementById("email2").className = "textMal";
			}
			else{
				document.getElementById("email2").className = "textBien";
			}

			//Comparacion email 1 y 2
			if (vEmail1 != vEmail2){
				todoBien=false;
				document.getElementById("email2").className = "textMal";
			}

			
		 //Nombre Via:
			var vViaNombre = document.getElementById("viaNombre").value;
			if( vViaNombre == null || vViaNombre.length == 0 || /^\s+$/.test(vViaNombre) || !isNaN(vViaNombre)) {
				todoBien=false;
				document.getElementById("viaNombre").className = "textMal";
			}
			else{
				document.getElementById("viaNombre").className = "textBien";
			}				

			
		//Via Numero:	
			var vViaNumero = document.getElementById("viaNumero").value;
			if( vViaNumero=="" || isNaN(vViaNumero) ) {
				todoBien=false;
				document.getElementById("viaNumero").className = "textMal";
			}	
			else{
				document.getElementById("viaNumero").className = "textBien";
			}	

			
		 //Localidad:
			var vLocalidad = document.getElementById("localidad").value;
			if( vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
				todoBien=false;
				document.getElementById("localidad").className = "textMal";
			}
			else{
				document.getElementById("localidad").className = "textBien";
			}					

			
		//Codigo Postal:	
			var vCodigoPostal = document.getElementById("codigoPostal").value;
			if( vCodigoPostal.length!=5 || vCodigoPostal=="" || isNaN(vCodigoPostal) ) {
				todoBien=false;
				document.getElementById("codigoPostal").className = "textMal";
			}	
			else{
				document.getElementById("codigoPostal").className = "textBien";
			}	
	
	
		//Provincia:
			var vProvincia = document.getElementById("provincia").selectedIndex;
			if( vProvincia == null || vProvincia == 0 ) {
				todoBien=false;
				document.getElementById("provincia").className = "textMal";
			}
			else{
				document.getElementById("provincia").className = "textBien";
			}	
	
	
		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de mostrar el formulario de los datos personales:
		if (todoBien){
			pideDatosPago();
		}
		else{
			document.getElementById("botonConfirmar").disabled = true;
		}
	}

	
	
	
//FUNCION DE VALIDAR DATOS y PEDIR DATOS PAGO
	function pideDatosPago(elEvento) {
/**/	document.getElementById("divTotal").className = "divsNo";
/**/	document.getElementById("divDatos").className = "divsNo";
		document.getElementById("divPago").className = "divsSi";
		document.getElementById("botonConfirmar").disabled = false;
	}
	
	

	
//FUNCION DE VALIDACION DE DATOS PAGO:
	function validaDatosPago(elEvento) {

		var todoBien = true;
		
		//Titular de la cuenta:
		var vTitular = document.getElementById("titular").value;
		if( vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
			todoBien=false;
			document.getElementById("titular").className = "textMal";
		}
		else{
			document.getElementById("titular").className = "textBien";
		}			
	
	
		//Tipo de tarjeta:
		var vTarjetas = document.getElementsByName("tarjetas");
		var seleccionado = false;
		for(var i=0; i<vTarjetas.length; i++) {
			if(vTarjetas[i].checked) {
				seleccionado = true;
				//break;
			}
		}
		if(!seleccionado) {
			todoBien=false;
			document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
		}
		else{
			document.getElementById("alertTipoDeTarjeta").className = "";
		}		
	
	
		//Numero de tarjeta:	
		var vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
		if( vNumeroTarjeta.length!=16 || vNumeroTarjeta=="" || isNaN(vNumeroTarjeta) ) {
			todoBien=false;
			document.getElementById("numeroTarjeta").className = "textMal";
		}	
		else{
			document.getElementById("numeroTarjeta").className = "textBien";
		}		

		
		//CVC de la tarjeta:	
		var vCvcTarjeta = document.getElementById("cvcTarjeta").value;
		if( vCvcTarjeta.length!=3 || vCvcTarjeta=="" || isNaN(vCvcTarjeta) ) {
			todoBien=false;
			document.getElementById("cvcTarjeta").className = "textMal";
		}	
		else{
			document.getElementById("cvcTarjeta").className = "textBien";
		}	

		
		//Fecha de tarjeta MES:
		var vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
		if( vMesTarjeta == null || vMesTarjeta == 0 ) {
			todoBien=false;
			document.getElementById("mesTarjeta").className = "textMal";
		}
		else{
			document.getElementById("mesTarjeta").className = "textBien";
		}	
		//Fecha de tarjeta AÑO:
		var vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
		if( vAnioTarjeta == null || vAnioTarjeta == 0 ) {
			todoBien=false;
			document.getElementById("anioTarjeta").className = "textMal";
		}
		else{
			document.getElementById("anioTarjeta").className = "textBien";
		}				


		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de enviar los datos:
		if (todoBien){
			validaDatosPagoYEnviaCarro();
		}
	}

	


//FUNCION DE VALIDAR DATOS PAGO y ENVIAR DATOS
	function validaDatosPagoYEnviaCarro(elEvento) {
		alert("Gracias por su compra, en 24 horas recivira su pedido\nAhora sera redirigido a la pagina de inicio.");
		window.location.reload()
	}

	
	
	
