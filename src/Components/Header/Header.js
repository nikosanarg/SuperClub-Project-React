import { useMatch } from 'react-router'
import './Header.css'
import Button from '../Button/Button'
import { useContext, useRef } from 'react'
import MenuButton from '../MenuButton/MenuButton'
import SearchButton from '../SearchButton/SearchButton'
import Arrow from '../Arrow/Arrow'
import { deleteProduct } from '../../Utils/ProductUtils'
import { Link } from 'react-router-dom'

const Header = ({ handlerShowMenu, searchContext }) => {
  let title
  let contentRight
  const sectionMatch = useMatch('/:section')
  const idMatch = useMatch('/:section/:id')
  const searchInput = useRef('')
  let { setSearch } = useContext(searchContext)

  const handleSearch = () => {
    setSearch(searchInput.current.value)
  }

  if (!sectionMatch && !idMatch) {
    title = '¡Hola Olivia!'
  } else if (!idMatch) {
    if (sectionMatch.params.section === 'products') {
      title = 'Productos'
      contentRight = (
        <>
          <form className="header-form" action="" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Buscar productos" ref={searchInput} onKeyUp={handleSearch} />
            <SearchButton />
          </form>
          <Link to="/products/new">
            <div className="add-element-desktop">
              <Button text="Agregar Producto" />
            </div>
            <div className="add-element-mobile">
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
            <input type="text" placeholder="Buscar tiendas" ref={searchInput} onKeyUp={handleSearch} />
            <SearchButton />
          </form>
          <Link to="/stores/new">
            <div className="add-element-desktop">
              <Button text="Agregar tienda" />
            </div>
            <div className="add-element-mobile">
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
            <Button text="Eliminar" callback={() => deleteProduct(idMatch.params.id)} />
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
    <header>
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
