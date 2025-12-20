import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./assets/IMAGE.png";
import productPhoto from "./assets/Telephone.png";
import "./Products.css";

const API_URL = "http://localhost:3001";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [addForm, setAddForm] = useState({ 
    title: "", 
    description: "", 
    specs: "", 
    image_url: "", 
    price: "" 
  });
  const [updateForm, setUpdateForm] = useState({ 
    id: "",
    title: "", 
    description: "", 
    specs: "", 
    image_url: "", 
    price: "" 
  });

  // Загрузка данных
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios.get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  };

  // Обработка добавления товара
  const handleAdd = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/products`, addForm)
      .then(res => {
        setProducts([res.data, ...products]);
        setAddForm({ title: "", description: "", specs: "", image_url: "", price: "" });
      })
      .catch(err => {
        console.error("Ошибка добавления товара:", err);
        alert("Ошибка при добавлении товара");
      });
  };

  // Обработка удаления товара
  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      axios.delete(`${API_URL}/products/${id}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(err => {
          console.error("Ошибка удаления товара:", err);
          alert("Ошибка при удалении товара");
        });
    }
  };

  // Загрузка данных товара при вводе ID
  const handleUpdateIdChange = (e) => {
    const id = e.target.value;
    setUpdateForm({ ...updateForm, id });
    
    if (id && !isNaN(id)) {
      axios.get(`${API_URL}/products/${id}`)
        .then(res => {
          const product = res.data;
          setUpdateForm({
            id: product.id.toString(),
            title: product.title || "",
            description: product.description || "",
            specs: product.specs || "",
            image_url: product.image_url || "",
            price: product.price ? product.price.toString() : ""
          });
        })
        .catch(err => {
          console.error("Товар не найден:", err);
          // Очищаем форму если товар не найден
          setUpdateForm({ 
            id: id,
            title: "", 
            description: "", 
            specs: "", 
            image_url: "", 
            price: "" 
          });
        });
    } else if (!id) {
      // Очищаем форму если ID пустой
      setUpdateForm({ 
        id: "",
        title: "", 
        description: "", 
        specs: "", 
        image_url: "", 
        price: "" 
      });
    }
  };

  // Обработка обновления товара
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updateForm.id) {
      alert("Введите ID товара");
      return;
    }
    
    axios.put(`${API_URL}/products/${updateForm.id}`, {
      title: updateForm.title,
      description: updateForm.description,
      specs: updateForm.specs,
      image_url: updateForm.image_url,
      price: updateForm.price
    })
      .then(res => {
        setProducts(products.map(p => p.id === parseInt(updateForm.id) ? res.data : p));
        setUpdateForm({ id: "", title: "", description: "", specs: "", image_url: "", price: "" });
        alert("Товар успешно обновлен");
      })
      .catch(err => {
        console.error("Ошибка обновления товара:", err);
        alert("Ошибка при обновлении товара");
      });
  };

  return (
    <>
    <div className="logo">
      <img src={Logo} alt="" />
    </div>
      <div className="productWrapper">
        <h1>Добавить товар</h1>
        <form className="addProduct productBlock" onSubmit={handleAdd}>
          <div className="leftProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Название товара</label>
                <input 
                  type="text" 
                  placeholder="Товар 1" 
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  required
                />
            </article>
            <article className="addProduct__blocks">
                <label>Стоимость товара</label>
                <input 
                  type="text" 
                  placeholder="1000" 
                  value={addForm.price}
                  onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                />
            </article>
            <article className="addProduct__blocks productDescription">
                <label>Описание товара</label>
                <textarea 
                  type="text" 
                  placeholder="Описание товара" 
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                />
            </article>
          </div>
          <div className="rightProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Характеристики товара</label>
                <input 
                  type="text" 
                  placeholder="Объем памяти: 1000" 
                  value={addForm.specs}
                  onChange={(e) => setAddForm({ ...addForm, specs: e.target.value })}
                />
            </article>
            <article className="addProduct__blocks">
                <label>URL фотографии товара</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg" 
                  value={addForm.image_url}
                  onChange={(e) => setAddForm({ ...addForm, image_url: e.target.value })}
                />
                {addForm.image_url && (
                  <div className="productPhoto">
                    <img src={addForm.image_url || productPhoto} alt="Preview" />
                  </div>
                )}
                <div>
                  <button type="submit">Добавить товар</button>
                </div>
            </article>
          </div>
        </form>
      </div>
      <div className="productWrapper">
        <h1>Обновить товар</h1>
        <form className="updateProduct productBlock" onSubmit={handleUpdate}>
          <div className="leftProductBlock PBPart">
            <article className="addProduct__blocks">
              <label>id_товара</label>
              <input 
                type="text" 
                placeholder="5" 
                value={updateForm.id}
                onChange={handleUpdateIdChange}
              />
            </article>
            <article className="addProduct__blocks">
                <label>Название товара</label>
                <input 
                  type="text" 
                  placeholder="Товар 1" 
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                />
            </article>
            <article className="addProduct__blocks">
                <label>Стоимость товара</label>
                <input 
                  type="text" 
                  placeholder="1000" 
                  value={updateForm.price}
                  onChange={(e) => setUpdateForm({ ...updateForm, price: e.target.value })}
                />
            </article>
            <article className="addProduct__blocks productDescription">
                <label>Описание товара</label>
                <textarea 
                  type="text" 
                  placeholder="Описание товара" 
                  value={updateForm.description}
                  onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                />
            </article>
          </div>
          <div className="rightProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Характеристики товара</label>
                <input 
                  type="text" 
                  placeholder="Объем памяти: 1000" 
                  value={updateForm.specs}
                  onChange={(e) => setUpdateForm({ ...updateForm, specs: e.target.value })}
                />
            </article>
            <article className="addProduct__blocks">
                <label>URL фотографии товара</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg" 
                  value={updateForm.image_url}
                  onChange={(e) => setUpdateForm({ ...updateForm, image_url: e.target.value })}
                />
                {updateForm.image_url && (
                  <div className="productPhoto">
                    <img src={updateForm.image_url || productPhoto} alt="Preview" />
                  </div>
                )}
                <div>
                  <button type="submit">Обновить товар</button>
                </div>
            </article>
          </div>
        </form>
      </div>
      <div className="productWrapper">
        <h1>Товары</h1>
        <div className="products">
          {products.length === 0 ? (
            <p>Товаров пока нет</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="productCard">
                <div className="productCard__image">
                  <img src={product.image_url || productPhoto} alt={product.title} />
                </div>
                <div className="productCard__info">
                  <h3>{product.title}</h3>
                  {product.price && <p className="productCard__price">{product.price} ₽</p>}
                  {product.description && <p className="productCard__description">{product.description}</p>}
                  {product.specs && <p className="productCard__specs">{product.specs}</p>}
                </div>
                <button 
                  className="productCard__delete" 
                  onClick={() => handleDelete(product.id)}
                >
                  Удалить
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
