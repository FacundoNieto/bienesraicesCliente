import Head from 'next/head'
import styled from '@emotion/styled'
import {css} from '@emotion/react'; //para escribir CSS como si estuviésemos en los 90's
import usePropiedades from '../hooks/usePropiedades'
import axios from 'axios'
import { useState ,useEffect } from 'react'
import useFiltro from '../hooks/useFiltro';

const Contenedor = styled.div`
  margin: 0 auto; /*para que esté centrado */
  width: 95% /*casi todo el ancho de la pantalla*/
  max-width: 1200px;
`;

const Home = () => {

  const [propiedades, guardarPropiedades] = useState([]) /*le asigno a la variable propiedades un array vacío [] porque se le cargará el array de objetos json de la api dada por strapi cuando se ejecute la función guardarPropiedades() en el hook useEffect() */
  const [filtradas, guardarFiltradas] = useState([])

  /*importo el componente funcional Propiedades. No era más simple hacer la carpeta "components" y exportarlo desde ahí?*/
  const {Propiedades} = usePropiedades(filtradas); /*le paso el array de objetos json almacenado en "filtradas" para que la función Propiedades() muestre las tags html (jsx) con la info de la api rest devuelta por strapi. Existe un filtro en la función Home() que provoca que en "filtradas" solo se almacenen las casas pertenecientes a ciertas categorías*/
  const {una_categoria , FiltroUI} = useFiltro();

  //llamado a la api con axios
  useEffect( () => {
    if(una_categoria){
      // console.log(propiedades.attributes.Categoria.data.id)
      const filtradas = propiedades.filter( propiedad => propiedad.attributes.Categoria.data.id == una_categoria )
      console.log(filtradas)
      guardarFiltradas(filtradas)
    }else{
      const obtenerPropiedades = async () => {
        const resultado = await axios.get('http://localhost:1337/api/propiedades?populate=*')
        //const resultado = await axios.get('http://localhost:1337/api/propiedades')
        guardarPropiedades(resultado.data.data) /*carga el array de objetos json en la variable propiedades  */ 
        guardarFiltradas(resultado.data.data)
        // console.log(resultado.data.data)
        // console.log("\n\n\n\n Ahora las url de las imagenes:")
        // console.log(resultado.data.data[0].attributes.Imagen.data[0].attributes.url) /*fijate que para obtener el array de objetos json con la información de las diferentes propiedades hay que entrar a resultado.data.data, probá imprimiendo en consola "resultado" despues "resultado.data" y después "resultado.data.data"*/
      }
      obtenerPropiedades();
    }
    
    
  }, [una_categoria]); /*se ejecutará cada vez que cambie el valor una_categoría*/ 

  return ( 
    <Contenedor>
      <Head>
        <title>Ejemplo Headless CMS con Strpi y Next.js</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" rel="stylesheet"></link>
        {/*íconos de fontawesome:*/}
        <script src="https://use.fontawesome.com/5d98b586ab.js"></script>
      
      </Head>
      
      <FiltroUI />
      <h1 css = {css `
          text-align: center;
          font-family: 'Lato', sans-serif;
        `}
        >
          Bienesraíces
      </h1>
      <h2
        //escribo código css gracias a  import {css} from '@emotion/core'*/
        css = {css `
          text-align: center;
          font-family: 'Lato', sans-serif;
        `}
      >
        Nuestras casas y departamentos
      </h2>
      
      <Propiedades/>
    </Contenedor>
  );
}

export default Home;
