import {Link} from 'react-router-dom';
import axios from 'axios';
import React, {Component} from 'react';

const Inscripcion = props =>(
    <tr key={props.inscription.numero_documento}>
      <td>
        {props.inscription.tipo_documento}
      </td>
      <td>
        {props.inscription.nombres}
      </td>
      <td>
        {props.inscription.apellidos}
      </td>
      <td>
        {props.inscription.numero_documento}
      </td>
      <td>
        {props.inscription.tipo_sangre}
      </td>
      <td>
        {props.inscription.rh}
      </td>
      <td>
        {props.inscription.genero}
      </td>      
    </tr>
	
);

export default class InscriptionList extends Component{
    constructor(props)
    {
        super(props);
        this.state= {inscription:[],
                     header:[]};
    }
    componentDidMount(){
        axios.get("http://localhost:4000/inscription")
            .then(response =>{
                this.setState({inscription:response.data,
                               header:Object.keys(response.data[0])});
            })
            .catch(error => {
                console.log(error);
            });
    }
    inscriptionList(){
        console.log(this.state.inscription);
        return this.state.inscription.map(function(currentIns, i){
            return <Inscripcion inscription={currentIns} key={i}/>;
        });
    }
    renderTableHeader(){
        console.log(this.state.header);
        return this.state.header.map((key,index) =>{
            if(key==='nombres' || key === 'tipo_documento' || key === 'apellidos'
               || key==='numero_documento' || key==='genero'|| key ==='tipo_sangre'
              || key==='rh')
                return <th onClick={e=>this.onSort(e,key)}key={index}>{key.toUpperCase()}</th>;
            else
                return '';
        });
    }
    onSort(event, sortKey)
    {
        const data = this.state.inscription;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
        this.setState({inscription:data});
    }
    render(){
        return (
            <div>
              <h3>Lista de Inscritos</h3>
              <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                  <tr>
                    {this.renderTableHeader()}
                  </tr>
                </thead>
                <tbody>
                  {this.inscriptionList()}
                </tbody>
              </table>
	    </div>
        );
    }
}
