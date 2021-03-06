const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let inscriptionSchema = new Schema({
    nombres:{
	type:String,
	required:[true, 'Por favor ingrese su nombre']
    },
    apellidos:{
	type:String,
	required:[true,'Por favor ingrese sus apellidos']
    },
    tipo_documento:{
	type:String,
	required:[true, 'Debe elegir un tipo de documento'],
	enum:['CC', 'TI','CE'],
	default:'CC'
    },
    numero_documento:{
	type:String,
	required:[true, 'Debe ingresar el n&uacute;mero de documento'],
	unique:[true, 'No puede registrarse dos veces'],
	validate:{
	    validator:function(v){
		return /\d+/.test(v);
	    },
	    message:props => `${props.value} No es un n&uacute;mero de identificaci&oacute;n v&aacute;lido`
	}
    },
    telefono:{
	type:String,
	required:[true, 'Debe ingresar un n&uacute;mero de tel&eacute;fono'],
	validate:{
	    validator:function(v){
		return /\(?\d{3}\)?-?\d+/.test(v);
	    },
	    message:props=> `&{props.value} No es un n&uacute;mero de tel&eacute;fono `
	}
    },
    direccion_residencia:
    {
	type:String,
	required:[true, 'Debe ingresar una direcci&oacute;n de residencia']
    },
    departamento:
    {
	type:String,
	required:[true, 'Debe seleccionar un Departamento']
    },
    municipio:
    {
	type:String,
	required:[true, 'Debe seleccionar un Municipio']
    },
    fecha_nacimiento:
    {
	type:Date,
	required:[true, 'Debe seleccionar una fecha de nacimiento']
    },
    aseguradora:
    {
	type:String,
	required:[true,'Debe ingresar su aseguradora']
    },
    medicina_prepagada:
    {
	type:String
    },
    tipo_sangre:
    {
	type:String,
	required:[true, 'Debe ingresar el tipo sangu&iacute;neo'],
	enum:['A','B','AB','O']	
    },
    rh:
    {
	type:String,
	required:[true,'Debe seleccionar RH'],
	enum:['Positivo', 'Negativo']
    },
    genero:
    {
	type:String,
	enum:['Masculino', 'Femenino']
	
    },
    grupo:
    {
	type:String
    },
    usuario_instagram:
    {
	type:String
    },
    marca_bicicleta:
    {
	type:String,
	required:[true,'Debe indicar la marca de su bicicleta']
    },
    ref_bicicleta:
    {
	type:String,
	required:[true,'Debe indicar la referencia de su bicicleta']
    },
    rin_bicicleta:
    {
	type:String,
	required:[true,'Debe seleccionar el Rin de la bicicleta'],
	enum:['26"', '27.5"', '29"']
    },
    anno_bicicleta:
    {
	type:String,
	required:[true,'Debe indicar el a&ntilde;o de la bicicleta'],
	
	validate:{
	    validator:function(v){
		return /\d{4}/.test(v);
	    },
	    message:props => `${props.value} No es un a&ntilde;o v&aacute;lido`
	},
    },
    nombre_contacto:
    {
	type:String,
	required:[true,'Debe agregar un contacto']
    },
    numero_contacto:
    {
	type:String,
	required:[true,'Debe agregar un contacto'],
	validate:{
	    validator:function(v){
		return /\(?\d{3}\)?-?\d+/.test(v);
	    },
	    message:props=> `&{props.value} No es un n&uacute;mero de tel&eacute;fono `
	}
    }
    
	
},{collection:'inscriptions'});

module.exports = mongoose.model('Inscription', inscriptionSchema);
