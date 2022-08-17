import React from "react";
import styled from "@emotion/styled";

/*creo un "styled component" llamado Grid, es como si creara una nueva tag y ésta reemplazará a un div (este styled component genera un div)*/
const Grid = styled.div`
  @media (min-width: 480px){
    display: grid;
    grid-template-columns: repeat(2, 1fr); /*hace que el div "Grid" sea un contenedor de 2 columnas de 1 fracción de la pantalla de ancho cada una */ 
    gap: 2rem;
  }

  @media (min-width: 768px){
    display: grid;
    grid-template-columns: repeat(3, 1fr); /*hace que el div "Grid" sea un contenedor de  columnas de 1 fracción de la pantalla de ancho cada una */ 
  }
`;

const Card = styled.div`
  border: 1px solid #B5B5B5;
  background-color: #F5F5F5;
  img{
    max-width: 100%; /*Hacemos que la imagen sea responsive*/
  }; 
`;

const Contenido = styled.div`
  padding: 1rem;
  h3{
    margin: 0 0 2rem 0; 
    font-size: 1.4rem;
    font-family: 'Lato', sans-serif;
  }
  ul{
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%
    justify-content: space-between;
  }
  ul li {
    display: flex;
  }
  ul li p{
    font-family: Lato, sans-serif;
    font-weight: 900;
  }

  ul li i{
    margin-right: 1rem;
  }
`;

const usePropiedades = (propiedades) => {/*propiedades es un array de objetos json devuelto por axios.get() para que la función Propiedades() muestre las tags html (jsx) con la info de la api rest devuelta por strapi*/
    
    // console.log(propiedades);
  const Propiedades = () => ( /*paréntesis sí o sí porque da por implícita declarada la función return, si ponés llaves no retorna nada, o tal ves haya que desestructurarlo...*/
    <Grid>
      {
        propiedades.map( ({id , attributes}) => (
          <Card key = {id}>
            {/* <h1>{id}</h1> */}
            {/*ruta de las imágenes: attributes.Imagen.data[0].attributes.url, devuelve un string: "/uploads/nombreImagen.jpg" */}
            <h4>{attributes.Categoria.data.attributes.Nombre}</h4>
            <img src = {`http://localhost:1337${attributes.Imagen.data[0].attributes.url}`} />

            <Contenido>
              <h3>{attributes.Nombre}</h3>
              <ul>
                <li>
                  <i class="fa fa-bath" aria-hidden="true" fa-5x></i>
                  <p>{attributes.WC}</p> 
                </li>
                <li>
                  <i class="fa fa-car" aria-hidden="true"></i>
                  <p>{attributes.Estacionamiento}</p>                  
                </li>
                <li>
                  <i class="fa fa-bed" aria-hidden="true"></i>
                  <p>{attributes.Habitaciones}</p>
                </li>
              </ul>
            </Contenido>
          
          </Card>
        ))
      }
    </Grid>
  )

  return { /*se retorna un objeto porque tiene la ventaja de la desestructurización, si devolviera un array [] tendría que recorrerlo para obtener los datos que devuelve*/
    Propiedades /*si desestructuro con {Propiedades} OBTENDRÉ lo que devuelve const Propiedades = () => {} que es un h1 */
  }
}

export default usePropiedades;

