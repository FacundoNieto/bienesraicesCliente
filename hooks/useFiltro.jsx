import styled from '@emotion/styled'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Formulario = styled.form`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  border: 1px solid #e1e1e1;
`;

const Select = styled.select`
  flex: 1;
  padding: 1rem;
  border: none;
  text-align: center;
  font-family: 'Lato', sans-serif;
  appearance: none;
  background-color: white; 
`;

function useFiltro() {
  const [categorias, guardarCategorias] = useState([])
  const [una_categoria, guardarUnaCategoria] = useState('')


  useEffect(() => {
    const obtenerCategorias = async () => {
      const resultado = await axios.get('http://localhost:1337/api/categorias')
      guardarCategorias(resultado.data.data);
      // console.log("\n\n\t\t A VER CHEEEE!: \n\n")
      // console.log(resultado.data.data[0].attributes.Nombre)
    }
    obtenerCategorias();
  }, []) 
  // // console.log(categorias[0].attributes.Nombre) // Una vez funcionó esto, después tiró error
  const FiltroUI = () => (
    <Formulario>
        {/*<h2>{categorias[0].attributes.Nombre}</h2> // funciona una sola vez, después tira error y tenés que sacarlo. No entiendo por qué*/}
        <Select onChange={e => guardarUnaCategoria(e.target.value)} value = {una_categoria}>
          <option value="">--Filtrar--</option>
          {
            categorias.map( (opcion) => (
              <option key = {opcion.id} value = {opcion.id}>
                {opcion.attributes.Nombre}
              </option>
            ) )
          }
        {/* <option value="">{categorias[0].attributes.Nombre}</option> funciona una sola vez, después tira error y tenés que sacarlo. No entiendo por qué
        */}
        </Select>
      </Formulario>
  );
  
  return {
    una_categoria,
    FiltroUI
  };
}

export default useFiltro