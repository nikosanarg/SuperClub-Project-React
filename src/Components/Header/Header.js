import { useMatch, useNavigate } from 'react-router'
import './Header.css'
import Button from '../Button/Button'
import { useContext, useRef } from 'react'
import MenuButton from '../MenuButton/MenuButton'
import SearchButton from '../SearchButton/SearchButton'
import Arrow from '../Arrow/Arrow'
import { deleteProduct } from '../../Utils/ProductUtils'
import { Link } from 'react-router-dom'

const Header = ({ handlerShowMenu, searchContext, history }) => {
  let title
  let contentRight
  const sectionMatch = useMatch('/:section')
  const idMatch = useMatch('/:section/:id')
  const navigate = useNavigate()
  const searchInput = useRef('')
  let { setSearch } = useContext(searchContext)

  const handleSearch = () => {
    setSearch(searchInput.current.value)
  }

  const handleDelete = () => {
    deleteProduct(idMatch.params.id).then(navigate('/products'))
  }

  if (!sectionMatch && !idMatch) {
    title = '¡Hola Olivia!'
  } else if (!idMatch) {
    if (sectionMatch.params.section === 'products') {
      title = 'Productos'
      contentRight = (
        <>
          <form className="header-form" action="" onSubmit={(e) => e.preventDefault()}>
            <SearchButton />
            <input className="colorBuscadores" type="text" placeholder="Buscar productos" ref={searchInput} onKeyUp={handleSearch} />
          </form>
          <Link to="/products/new">
            <div className="header-btn-desktop">
              <Button text="Agregar Producto" />
            </div>
            <div className="header-btn-mobile">
              <Button text="+" />
            </div>
          </Link>
        </>
      )
    } else if (sectionMatch.params.section === 'stores') {
      title = 'Tiendas'
      contentRight = (
        <>
          <form className="header-form" action="" onSubmit={(e) => e.preventDefault()}>
            <input className="colorBuscadores" type="text" placeholder="Buscar tiendas" ref={searchInput} onKeyUp={handleSearch} />
            <SearchButton />
          </form>
          <Link to="/stores/new">
            <div className="header-btn-desktop">
              <Button text="Agregar tienda" />
            </div>
            <div className="header-btn-mobile">
              <Button text="+" />
            </div>
          </Link>
        </>
      )
    }
  } else if (!sectionMatch) {
    if (idMatch.params.section === 'products') {
      if (idMatch.params.id === 'new') {
        title = (
          <>
            <Link to="/products">Productos</Link> <Arrow /> Nuevo Producto
          </>
        )
      } else {
        title = (
          <>
            <Link to="/products">Productos</Link> <Arrow /> #{idMatch.params.id}
          </>
        )
        contentRight = (
          <>
            <div className="header-btn-desktop">
              <Button text="Eliminar" callback={handleDelete} />
            </div>
            <div className="header-btn-mobile">
              <Button text="-" callback={handleDelete} />
            </div>
          </>
        )
      }
    } else if (idMatch.params.section === 'stores') {
      if (idMatch.params.id === 'new') {
        title = (
          <>
            <Link to="/stores">Tiendas</Link> <Arrow /> Nueva Tienda
          </>
        )
      } else {
        title = (
          <>
            <Link to="/stores">Tiendas</Link> <Arrow /> #{idMatch.params.id}
          </>
        )
      }
    }
  }

  return (
    <header className="colorPrincipal">
      <div className="header-left">
        <div onClick={() => handlerShowMenu(true)}>
          <MenuButton />
        </div>
        <h2 className="header-title">{title}</h2>
      </div>
      <div className="header-right">{contentRight}</div>
    </header>
  )
}

export default Header
