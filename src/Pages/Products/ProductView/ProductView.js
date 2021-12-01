import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import Button from '../../../Components/Button/Button'
import { getProduct, postProduct } from '../../../Utils/ProductUtils'
import { getStoresList } from '../../../Utils/StoreUtils'
import './ProductView.css'
import notImage from '../../../Assets/image-not-found.png'

const ProductView = () => {
  const [product, setProduct] = useState([])
  const [stores, setStores] = useState([])
  const [store, setStore] = useState([])
  const [gallery, setGallery] = useState([])

  const nombre = useRef('')
  const categoria = useRef('')
  const stock = useRef('')
  const precio = useRef('')
  const descripcion = useRef('')
  const tienda = useRef('')
  const imagen = useRef('')
  const galeria = useRef('')

  const { id } = useParams()
  useEffect(async () => {
    let producto = await getProduct(id)
    let tiendas = await getStoresList()
    let storeProduct = setTimeout(
      tiendas.find((t) => t._id === producto.store),
      1000
    )
    setProduct(producto)
    setStore(storeProduct)
    setStores(tiendas)
    setGallery(producto.gallery)
    nombre.current.value = producto.title || ''
    precio.current.value = producto.price || 0
    stock.current.value = producto.stock || 0
    descripcion.current.value = producto.description || ''
    tienda.current.value = producto.store || ''
    categoria.current.value = producto.category || ''
    imagen.current.value = producto.image || ''
  }, [])

  const addGalleryItem = (e) => {
    e.preventDefault()
    if (galeria.current.value != '' && e.key == 'Enter') {
      setGallery([...gallery, galeria.current.value])
      galeria.current.value = ''
    }
  }

  const deleteGalleryItem = (item) => {
    console.log('-----------')
    console.log(item)
    setGallery(gallery.filter((e) => e != item))
  }

  const sendForm = (e) => {
    e.preventDefault()
    console.log('envio')
    //let res = postProduct(nombre.current.value, precio.current.value, descripcion.current.value, imagen.current.value)
  }

  const prevenirEnvio = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault(e)
      console.log('dsfsf')
    }
  }

  return (
    <div className="contenedor">
      <div className="product">
        <div className="product-img">
          <img src={product.image ? product.image : notImage} alt={product.title} />
        </div>
        <div>
          <h3>{product.title}</h3>
          <div className="product-info">
            <p className="puntos">
              {product.price}
              <span>Puntos superclub</span>
            </p>
            <p className="puntos">
              {product.stock}
              <span>Stock superclub</span>
            </p>
            <div className="tienda">
              {product.store && store ? (
                <>
                  <img src={store.logo ? store.logo : notImage} alt="" />
                  <span>{store.name}</span>
                </>
              ) : (
                <>
                  <img src={notImage} alt="not image" />
                  <span>El producto no tiene tienda</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="product-data">
        <h3>Información</h3>
        <form onSubmit={sendForm}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input required type="text" ref={nombre} id="nombre" />
          </div>
          <div className="input-group">
            <label htmlFor="categoria">Categoria</label>
            <input required type="text" ref={categoria} id="categoria" />
          </div>
          <div className="input-group">
            <label htmlFor="precio">Precio</label>
            <input required type="number" ref={precio} id="precio" />
          </div>
          <div className="input-group">
            <label htmlFor="stock">Stock</label>
            <input type="number" ref={stock} id="stock" />
          </div>
          <div className="input-group">
            <label htmlFor="descripcion">Descripcion</label>
            <textarea ref={descripcion} id="descripcion" cols="30" rows="10"></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="tienda">Tienda</label>
            <select ref={tienda} id="tienda">
              {stores &&
                stores.map((t) => (
                  <option value={t._id} key={t._id}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>

          <h3>Galaría de imagenes</h3>
          <div className="input-group">
            <label htmlFor="image">Imegen principal</label>
            <input type="text" ref={imagen} id="image" placeholder="Url de imagen..." />
          </div>
          <div className="input-group">
            <label htmlFor="image">Nueva imagen</label>
            <input type="text" ref={galeria} id="image" placeholder="Url de imagen..." onKeyUp={addGalleryItem} onKeyPress={prevenirEnvio} />
            <p>Imagenes actuales</p>

            {product &&
              gallery &&
              gallery.map((item, i) => {
                return (
                  <div className="product-galleryItem" key={i}>
                    <div className="product-galleryItem-img">
                      <div className="product-img">
                        <img src={item} alt={item} />
                      </div>
                      <p>{item}</p>
                    </div>
                    <Button type="button" text="Quitar" callback={() => deleteGalleryItem(item)} />
                  </div>
                )
              })}
          </div>
          <div className="actions">
            <Button type="button" text="Cancelar" />
            <Button text="Guardar" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductView
