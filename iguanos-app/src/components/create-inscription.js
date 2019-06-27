import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';
import DatePicker, {registerLocale} from 'react-datepicker';
import moment from 'moment';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);



const typeDocuments = [
    {label:"Cedula de Ciudadanía", value:"CC"},
    {label:"Cedula de Extranjería", value:"CE"},
    {label:"Tarjeta de Identidad", value:"TI"}
];
const bloodTypes = [
    {type:"A"},
    {type:"B"},
    {type:"AB"},
    {type:"O"}
];
const rhTypes = [
    {type:"Positivo"},
    {type:"Negativo"}
];
const genderTypes = [
    {type:"Masculino"},
    {type:"Femenino"}
];

const rinTypes = [
    {type:"26\""},
    {type:"27.5\""},
    {type:"29\""}
];

export default class CreateInscription extends Component{
    constructor(props){
	super(props);
	this.state = {
	    nombres : '',
	    apellidos : '',
	    tipo_documento : '',
	    numero_documento: '',
            telefono: '',
            direccion_residencia:'',
            departamento:'',
            municipio:'',
            fecha_nacimiento:'',
            aseguradora:'',
            medicina_prepagada:'',
            tipo_sangre:'',
            rh:'',
            genero:'',
            grupo:'',
            usuario_instagram:'',
            marca_bicicleta:'',
            ref_bicicleta:'',
            rin_bicicleta:'',
            anno_bicicleta:'',
            nombre_contacto:'',
            numero_contacto:'',
            departamentos : [],
            municipios:[],
            submitted : false
            
	};
	this.onChangeNombre = this.onChangeNombre.bind(this);
	this.onChangeApellido = this.onChangeApellido.bind(this);
        this.onChangeTipoDocumento = this.onChangeTipoDocumento.bind(this);
        this.onChangeNumeroDocumento = this.onChangeNumeroDocumento.bind(this);
        this.onChangeTelefono = this.onChangeTelefono.bind(this);
        this.onChangeDireccionResidencia = this.onChangeDireccionResidencia.bind(this);
        this.onChangeDepartamento = this.onChangeDepartamento.bind(this);
        this.onChangeMunicipio = this.onChangeMunicipio.bind(this);
        this.onChangeFechaNacimiento = this.onChangeFechaNacimiento.bind(this);
        this.onChangeAseguradora = this.onChangeAseguradora.bind(this);
        this.onChangeMedicinaPrepagada = this.onChangeMedicinaPrepagada.bind(this);
        this.onChangeTipoSangre = this.onChangeTipoSangre.bind(this);
        this.onChangeRH = this.onChangeRH.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeGrupo = this.onChangeGrupo.bind(this);
        this.onChangeUsuarioInstagram = this.onChangeUsuarioInstagram.bind(this);
        this.onChangeMarcaBicicleta = this.onChangeMarcaBicicleta.bind(this);
        this.onChangeRefBicicleta = this.onChangeRefBicicleta.bind(this);
        this.onChangeRinBicicleta = this.onChangeRinBicicleta.bind(this);
        this.onChangeAnnoBicicleta = this.onChangeAnnoBicicleta.bind(this);
        this.onChangeNombreContacto = this.onChangeNombreContacto.bind(this);
        this.onChangeNumeroContacto = this.onChangeNumeroContacto.bind(this);       
	this.onSubmit = this.onSubmit.bind(this);	
    }
    onChangeNombre(e){
        this.setState({
	    nombres : e.target.value
	});
    }
    onChangeApellido(e){
	this.setState({
	    apellidos: e.target.value
	});
    }
    onChangeTipoDocumento(e){
        this.setState({
	    tipo_documento: e.target.value
	});
    }
    onChangeNumeroDocumento(e){
	this.setState({
	    numero_documento: e.target.value
	});
    }
    onChangeTelefono(e){
	this.setState({
	    telefono: e.target.value
	});
    }
    onChangeDireccionResidencia(e){
        this.setState({
            direccion_residencia: e.target.value
        });
    }
    onChangeDepartamento(e){
	this.setState({
	    departamento: e.target.value
	});
    }
    onChangeMunicipio(e){
	this.setState({
	    municipio: e.target.value
	});
    }
    onChangeFechaNacimiento(e){
	this.setState({
	    fecha_nacimiento: e
	});
    }
    onChangeAseguradora(e){
	this.setState({
	    aseguradora: e.target.value
	});
    }
    onChangeMedicinaPrepagada(e){
	this.setState({
	    medicina_prepagada: e.target.value
	});
    }
    onChangeTipoSangre(e){
	this.setState({
	    tipo_sangre: e.target.value
	});
    }
    onChangeRH(e){
	this.setState({
	    rh: e.target.value
	});
    }
    onChangeGenero(e){
	this.setState({
	    genero: e.target.value
	});
    }
    onChangeGrupo(e){
	this.setState({
	    grupo: e.target.value
	});
    }
    onChangeUsuarioInstagram(e){
	this.setState({
	    usuario_instagram: e.target.value
	});
    }
    onChangeMarcaBicicleta(e){
	this.setState({
	    marca_bicicleta: e.target.value
	});
    }
    onChangeRefBicicleta(e){
	this.setState({
	    ref_bicicleta: e.target.value
	});
    }
    onChangeRinBicicleta(e){
	this.setState({
	    rin_bicicleta: e.target.value
	});
    }
    onChangeAnnoBicicleta(e){
	this.setState({
	    anno_bicicleta: e.target.value
	});
    }
    onChangeNombreContacto(e){
	this.setState({
	    nombre_contacto: e.target.value
	});
    }
    onChangeNumeroContacto(e){
	this.setState({
	    numero_contacto: e.target.value
	});
    }
    componentDidMount(){
        axios.get("http://localhost:4000/departamento")
            .then((response) => {
                this.setState({departamentos:response.data});                
             })
            .catch(error => {
                console.log(error);
            });
        console.log(this.state);
    }
    componentDidUpdate(prevProps, prevState)
    {
        if(this.state.departamento !== prevState.departamento)
        {
            let queryString = "https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=" + this.state.departamento;
            axios.get(queryString)
                .then((response) =>
                      {
                          this.setState({municipios:response.data});
                      })
                .catch(error =>
                       {
                           console.log(error);
                       });
        }
    }
    onSubmit(e){
	e.preventDefault();
	console.log(`Form submitted:`);
	console.log(this.state);

	const newInscription = {
	    nombres : this.state.nombres,
	    apellidos : this.state.apellidos,
	    tipo_documento : this.state.tipo_documento,
	    numero_documento : this.state.numero_documento,
            telefono: this.state.telefono,
            direccion_residencia: this.state.direccion_residencia,
            departamento: this.state.departamento,
            municipio: this.state.municipio,
            fecha_nacimiento:this.state.fecha_nacimiento,
            aseguradora: this.state.aseguradora,
            medicina_prepagada: this.state.medicina_prepagada,
            tipo_sangre: this.state.tipo_sangre,
            rh: this.state.rh,
            genero: this.state.genero,
            gurpo: this.state.grupo,
            usuario_instagram: this.state.usuario_instagram,
            marca_bicicleta: this.state.marca_bicicleta,
            ref_bicicleta: this.state.ref_bicicleta,
            rin_bicicleta: this.state.rin_bicicleta,
            anno_bicicleta: this.state.anno_bicicleta,
            nombre_contacto: this.state.nombre_contacto,
            numero_contacto: this.state.numero_contacto
	};
        console.log(newInscription);
	axios.post('http://localhost:4000/inscription', newInscription)
	    .then(res => console.log(res.data))
            .catch(err=> console.log(err));
	
	this.setState({
	    nombres : this.state.nombres,
	    apellidos : this.state.apellidos,
	    tipo_documento : this.state.tipo_documento,
	    numero_documento : this.state.numero_documento,
            telefono: this.state.telefono,
            direccion_residencia: this.state.direccion_residencia,
            departamento: this.state.departamento,
            municipio: this.state.municipio,
            fecha_nacimiento:this.state.fecha_nacimiento,
            aseguradora: this.state.aseguradora,
            medicina_prepagada: this.state.medicina_prepagada,
            tipo_sangre: this.state.tipo_sangre,
            rh: this.state.rh,
            genero: this.state.genero,
            gurpo: this.state.grupo,
            usuario_instagram: this.state.usuario_instagram,
            marca_bicicleta: this.state.marca_bicicleta,
            ref_bicicleta: this.state.ref_bicicleta,
            rin_bicicleta: this.state.rin_bicicleta,
            anno_bicicleta: this.state.anno_bicicleta,
            nombre_contacto: this.state.nombre_contacto,
            numero_contacto: this.state.numero_contacto,
            submitted:true
	});
    }
    render(){
        if(!this.state.submitted)
        {
	return(
	    <div style={{margitTop:10}}>
              <h3>Inscribirse: </h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Nombres: </label>
                  <input type="text"
                         className="form-control"
                         value={this.state.nombres}
                         onChange={this.onChangeNombre}
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos: </label>
                  <input type="text"
                         className="form-control"
                         value={this.state.apellidos}
                         onChange={this.onChangeApellido}
                  />
                </div>
                <div className="form-group">
                  <label>Tipo Documento: </label>
                  <select className="form-control"
                          onChange={this.onChangeTipoDocumento}
                          value={this.state.tipo_documento}
                  >
                    <option value="" disabled hidden>
                      Por favor Escoja un Tipo de Documento...
                    </option>
                    {
                        typeDocuments.map(
                            (typeDocument) =>
                                <option key={typeDocument.value}
                                        value={typeDocument.value}
                                >
                                  {typeDocument.label}
                                </option>                            
                        )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de Documento: </label>
                  <input type="text"
                         className="form-control"
                         value={this.state.numero_documento}
                         onChange={this.onChangeNumeroDocumento}/>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="text"
                          className="form-control"
                          value={this.state.telefono}
                          onChange={this.onChangeTelefono}/>
                </div>
                <div className="form-group">
                  <label>Dirección Residencia: </label>
                  <input type="text"
                         className="form-control"
                         value={this.state.direccion_residencia}
                         onChange={this.onChangeDireccionResidencia}/>
                </div>
            
                <div className="form-group">
                  <label>Departamento: </label>
                  <select className="form-control"
                          onChange={this.onChangeDepartamento}
                          value={this.state.departamento}>
                    <option value="" disabled hidden>
                      Por favor Escoja un Departamento...
                    </option>
                    {
                        this.state.departamentos.map(
                            ((depto) =>
                             <option key={depto.nombre}
                                     value={depto.nombre}>
                               {depto.nombre}
                             </option>
                            ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Municipio: </label>
                  <select className="form-control"
                          onChange={this.onChangeMunicipio}
                          value={this.state.municipio}>
                    <option value="" disabled hidden>
                      Por favor Escoja un Municipio...
                    </option>
                    {
                        this.state.municipios.map(
                            ((mpcio) =>
                             <option key={mpcio.municipio}
                                     value={mpcio.municipio}>
                               {mpcio.municipio}
                             </option>
                            ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha de Nacimiento: </label>
                  <DatePicker selected={this.state.fecha_nacimiento}
                              onChange={this.onChangeFechaNacimiento}
                              name="fechaNacimiento"
                              dateFormat="yyyy-MM-dd"
                              locale="es"
                  />
                </div>
                <div className="form-group">
                  <label>Aserguradora</label>
                  <input type="text"
                         className="form-control"
                         value={this.state.aseguradora}
                         onChange={this.onChangeAseguradora}
                  />
                  
                </div>
                <div className="form-group">
                  <label>Medicina Prepagada: </label>
                  <input type="text"
                         className="form-control"
                         value={this.state.medicina_prepagada}
                         onChange={this.onChangeMedicinaPrepagada}
                  />
                  
                </div>
                <div className="form-group">
                  <label>Tipo Sanguíneo: </label>
                  <select className="form-control"
                          onChange={this.onChangeTipoSangre}
                          value={this.state.tipo_sangre}
                  >
                    <option value="" disabled hidden>
                      Por favor Escoja un Tipo Sanguíneo...
                    </option>
                    {
                        bloodTypes.map(
                            (blood) =>
                                <option key={blood.type}
                                        value={blood.type}
                                >
                                  {blood.type}
                                </option>                            
                        )
                    }
                  </select>
                </div>
                                <div className="form-group">
                  <label>RH: </label>
                  <select className="form-control"
                          onChange={this.onChangeRH}
                          value={this.state.rh}
                  >
                    <option value="" disabled hidden>
                      Por favor Escoja RH...
                    </option>
                    {
                        rhTypes.map(
                            (rh) =>
                                <option key={rh.type}
                                        value={rh.type}
                                >
                                  {rh.type}
                                </option>                            
                        )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Genero: </label>
                  <select className="form-control"
                          onChange={this.onChangeGenero}
                          value={this.state.genero}
                  >
                    <option value="" disabled hidden>
                      Por favor Escoja un Genero...
                    </option>
                    {
                        genderTypes.map(
                            (gender) =>
                                <option key={gender.type}
                                        value={gender.type}
                                >
                                  {gender.type}
                                </option>                            
                        )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Grupo: </label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeGrupo}
                         value={this.state.grupo}/>
                </div>
                <div className="form-group">
                  <label>Usuario Instagram: </label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeUsuarioInstagram}
                         value={this.state.usuario_instagram}
                  />
                </div>
                <div className="form-group">
                  <label>Marca Bicicleta: </label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeMarcaBicicleta}
                         value={this.state.marca_bicicleta}
                  />
                </div>
                <div className="form-group">
                  <label>Ref Bicicleta: </label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeRefBicicleta}
                         value={this.state.ref_bicicleta}
                  />
                </div>
                <div className="form-group">
                  <label>Rin Bicicleta: </label>
                  <select className="form-control"
                          onChange={this.onChangeRinBicicleta}
                          value={this.state.rin_bicicleta}
                  >
                    <option value="" disabled hidden>
                      Por favor Escoja un Rin...
                    </option>
                    {
                        rinTypes.map(
                            (rin) =>
                                <option key={rin.type}
                                        value={rin.type}
                                >
                                  {rin.type}
                                </option>                            
                        )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Año Bicicleta: </label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeAnnoBicicleta}
                         value={this.state.anno_bicicleta}
                  />
                </div>
                <div className="form-group">
                  <label>Nombre Contacto</label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeNombreContacto}
                         value={this.state.nombre_contacto}                    
                  />
                </div>
                <div className="form-group">
                  <label>Número Contacto</label>
                  <input type="text"
                         className="form-control"
                         onChange={this.onChangeNumeroContacto}
                         value={this.state.numero_contacto}                   
                  />
                </div>
                <div className="form-group">
                  <input type="submit" value="Create Todo" className="btn btn-primary"/>
                </div>
            </form>
            </div>
	);
        }
        else
        {
            return (
                <div style={{margitTop:10}}>
                  Favor Consigar a XXXXXXXXXXX Cuenta de Banco YYYYY.
                  Hasta no recibir el pago no será segura la aceptación de su inscripción
                </div>
                
            );
        }
        
    }
}
