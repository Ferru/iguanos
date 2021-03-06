'use strict';
module.exports = function(app) {
    var inscription = require('../controllers/iguanosInscriptionController');

    //Ropa App Routes
    app.route('/inscription')
	.get(inscription.list_all_inscriptions)
	.post(inscription.create_a_inscription);
    
    app.route('/inscription/:numero_identificacion')
	.get(inscription.read_a_inscription);
    
    app.route('/inscription/genero/:genero')
	.get(inscription.read_all_inscriptions_gender);
    
    app.route('/inscription/ti/:tipo_id')
	.get(inscription.read_all_inscriptions_tipo);

    app.route('/departamento')
	.get(inscription.get_departamentos);
    app.route('/departamento/:nombre')
	.get(inscription.get_departamento_nombre);
    /*
    app.route('/buyer/:buyerId')
	.get(ropaList.read_a_user)
	.put(ropaList.update_a_user)
	.delete(ropaList.delete_a_user);*/
};
