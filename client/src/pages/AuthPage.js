import "./auth.css";
import { useContext, useEffect } from "react";
import { context } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function AuthPage() {
  const navigate = useNavigate();
  const { auth, set_auth } = useContext(context);

  useEffect(() => {
    if (auth) {
      toast.info("Вы уже авторизованы");
      navigate("/groups");
    }
  }, [auth, navigate]);

  const login = () => {
    let path_hash = window.location.hash;

    axios
      .post("/auth", {
        login: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Вы успешно авторизовались");
          var user = response.data.user;
          set_auth(true, user.sl_firstname, user.sl_lastname);
          console.log(path_hash);
          if (path_hash.startsWith("#redirect=")) {
            navigate(path_hash.slice(10));
          } else {
            navigate("/groups");
          }
        } else {
          set_auth(false);
          alert("Неверное имя пользователя или пароль");
        }
      })
      .catch((error) => {
        set_auth(false);
        toast.error(error);
      });
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      login();
    }
  });

  return (
    <div className="auth">
      <img src="./logo.png" alt="logo" />
      <h3>Авторизация</h3>
      <div>
        <div className="form-group">
          <label htmlFor="username">Логин</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button className="btn btn-primary" onClick={login}>
          Войти
        </button>
      </div>
    </div>
  );
}
