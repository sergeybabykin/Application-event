import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../App";
import { useContext } from "react";
import "./css/Header.css";

export default function Header({ user }) {
  const { set_auth } = useContext(context);
  const navigate = useNavigate();

  const logout = () => {
    axios.post("/logout").then((response) => {
      toast.success("Вы вышли из аккаунта");
      set_auth(false);
      navigate("/auth");
    });
  };

  return (
    <>
      <div className="links-container">
        <a className="link" href="tel:+74950330363" data-sign="whatsapp">
          Приемная комиссия
        </a>
        <a className="link" href="tel:+84955000363" data-sign="call">
          84955000363
        </a>
        <a className="link" href="tel:+88005500363" data-sign="call">
          88005500363
        </a>
        г. Москва
      </div>
      <div className="Header">
        <div className="Logo"></div>
        <div className="Title">
          Факультет информационных технологий
          <br />
          <span className="Subtitle">Отчет по воспитательной работе</span>
        </div>
        <div className="lc">
          {user.name} {user.lastname}
          <p className="LinkButton small-btn" onClick={logout}>
            Выйти
          </p>
        </div>
      </div>
      <div className="Divider"></div>
      <div className="Button-Container">
        <LinkButton url="/groups">Группы</LinkButton>
        <LinkButton url="/students">Студенты</LinkButton>
        <LinkButton url="/staff">Преподаватели</LinkButton>
        <LinkButton url="/event-card-list">План работ</LinkButton>
        <LinkButton url="/events-log">Журнал воспитательной работы</LinkButton>
        <LinkButton url="/report">Отчет</LinkButton>
      </div>
    </>
  );
}

const LinkButton = ({ children, url = null }) => {
  const navigate = useNavigate();
  return (
    <div
      className="LinkButton"
      onClick={() => {
        navigate(url);
      }}
    >
      {children}
    </div>
  );
};
