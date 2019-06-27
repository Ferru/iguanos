const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    nombre:{
	type:String,
	required:[true, 'Debe insertar el nombre del departamento']
    }
}, {collection:'departamentos'});

module.exports = mongoose.model('Departamento', departamentoSchema);
