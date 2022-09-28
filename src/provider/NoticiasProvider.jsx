import axios from 'axios';
import { useState, useEffect } from 'react'
import NoticiasContext from '../context/NoticiasContext';

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState('general')
  const [noticias, setNoticias] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalNoticias, setTotalNoticias] = useState(0)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://cors-anywhere-mav.herokuapp.com/https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apikey=${import.meta.env.VITE_NEWS_API_KEY}`

      const { data } = await axios(url)

      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
      setPagina(1)
    }
    consultarAPI()
  }, [categoria])

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://cors-anywhere-mav.herokuapp.com/https://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&apikey=${import.meta.env.VITE_NEWS_API_KEY}`

      const { data } = await axios(url)

      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
    }
    consultarAPI()
  }, [pagina])


  const handleChangeCategoria = e => {
    setCategoria(e.target.value)
  }

  const handleChangePagina = (e, value) => {
    setPagina(value)
  }

  return(
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        pagina,
        handleChangePagina
      }}
    >
      {children}
    </NoticiasContext.Provider>
  )
}

export default NoticiasProvider
