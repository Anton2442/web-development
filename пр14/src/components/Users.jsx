import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./assets/IMAGE.png";
import productPhoto from "./assets/Telephone.png";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  // Загрузка данных
  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:3000/users", form)
      .then(res => setUsers([...users, res.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    setEditId(id);
    const user = users.find(u => u.id === id);
    setForm({ name: user.name, email: user.email, age: user.age });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/users/${editId}`, form)
      .then(res => {
        setUsers(users.map(u => u.id === editId ? res.data : u));
        setEditId(null);
        setForm({ name: "", email: "", age: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <>
    <div className="logo">
      <img  src={Logo} alt="" />
    </div>
      <div className="productWrapper">
        <h1>Добавить товар</h1>
        <div className="addProduct productBlock">
          <div className="leftProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Название товара</label>
                <input type="text" placeholder="Товар 1" />
            </article>
            <article className="addProduct__blocks">
                <label>Стоимость товара</label>
                <input type="text" placeholder="1000" />
            </article>
            <article className="addProduct__blocks productDescription">
                <label>Описание товара</label>
                <textarea type="text" placeholder="1000" />
            </article>
          </div>
          <div className="rightProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Характеристики товара</label>
                <input type="text" placeholder="Объем памяти: 1000" />
            </article>
            <article className="addProduct__blocks">
                <label>Фотография товара</label>
                <div className="productPhoto">
                  <img src={productPhoto} alt="" />
                </div>
                <div>
                  <button>Добавить товар</button>
                </div>
            </article>
          </div>
        </div>
      </div>
      <div className="productWrapper">
        <h1>Обновить товар</h1>
        <div className="updateProduct productBlock">
          <div className="leftProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Название товара</label>
                <input type="text" placeholder="Товар 1" />
            </article>
            <article className="addProduct__blocks">
                <label>Стоимость товара</label>
                <input type="text" placeholder="1000" />
            </article>
            <article className="addProduct__blocks productDescription">
                <label>Описание товара</label>
                <textarea type="text" placeholder="1000" />
            </article>
            <article className="addProduct__blocks">
              <label>id_товара</label>
              <input type="text" placeholder="5" />
            </article>
          </div>
          <div className="rightProductBlock PBPart">
            <article className="addProduct__blocks">
                <label>Характеристики товара</label>
                <input type="text" placeholder="Объем памяти: 1000" />
            </article>
            <article className="addProduct__blocks">
                <label>Фотография товара</label>
                <div className="productPhoto">
                  <img src={productPhoto} alt="" />
                </div>
                <div>
                  <button>Обновить товар</button>
                </div>
            </article>
          </div>
        </div>
      </div>
      <div className="productWrapper">
        <h1>Товары</h1>
        <div className="products">

        </div>
      </div>
    </>
  );
}

export default Users;
