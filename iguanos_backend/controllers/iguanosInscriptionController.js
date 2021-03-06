'use strict';
var mongoose = require('mongoose'); 
let inscription = require('../iguanos.model');
let departamento = require('../departamento.model');


exports.list_all_inscriptions = function(req, res){
    inscription.find({}, function(err, inscriptions){
	if(err)
	    console.log(err);
	else
	{
	    res.json(inscriptions);
	}
    });
    
};

exports.create_a_inscription = function(req,res){
    var insc = new inscription(req.body);
    insc.save(function(err, inscription){
	if(err)
	    res.status(400).send(err);
	else
	    res.status(200).json(inscription);
    });
};

exports.read_a_inscription = function(req,res){
    let numero_id = req.params.numero_identificacion;
    inscription.findOne({numero_documento:numero_id}, function(err, inscription){
	if(err)
	    res.status(400).send(err);
	else
	{
	    res.status(200).json(inscription);
	}
    });
};

exports.read_all_inscriptions_gender = function(req,res){
    let gender = req.params.genero;
    inscription.find({genero:gender}, function(err,inscriptions){
	if(err)
	    res.status(400).send(err);
	else
	    res.status(200).json(inscriptions);
    });
};

exports.read_all_inscriptions_tipo = function(req, res){
    let tipo_id = req.params.tipo_id;
    inscription.find({tipo_documento:tipo_id}, function(err, inscription){
	if(err)
	    res.status(400).send(err);
	else
	    res.status(200).json(inscription);
    });
};

exports.get_departamentos = function(req, res){
    departamento.find({}, ['nombre'],{sort:{nombre:1}}, function(err, departamentos){
	if(err)
	    res.status(400).send(err);
	else
	    res.status(200).json(departamentos);
    });
};

exports.get_departamento_nombre = function(req, res){
    let name = req.params.nombre;
    departamento.find({nombre:name}, function(err, departamento){
	if(err)
	    res.status(400).send(err);
	else
	    res.status(200).json(departamento);
    });
};
