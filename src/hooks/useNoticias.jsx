import { useContext } from 'react'
import NoticiasContext from '../context/NoticiasContext'
 
const useNoticias = () => {
  return useContext(NoticiasContext)
}

export default useNoticias