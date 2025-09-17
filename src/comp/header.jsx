import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="myheader">
      <header
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="hide-when-mobile ahmed"
      >
        <h1>
          <Link to="/">{t("createtasks")}</Link>
        </h1>

        <i
          onClick={() => toggleTheme(theme === "Light" ? "Dark" : "Light")}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => toggleTheme(theme === "Light" ? "Dark" : "Light")}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          {/* Language Switcher */}
          <li className="main-list lang">
            {t("lang")}
            <ul className="lang-box">
              <li
                onClick={() => i18n.changeLanguage("ar")}
                dir="rtl"
              >
                <p>العربية</p>
                {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
              </li>

              <li onClick={() => i18n.changeLanguage("en")}>
                <p>English</p>
                {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("sign")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("up")}
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() =>
                signOut(auth).catch((error) => console.log(error))
              }
              className="main-list"
            >
              <button className="main-link signout">{t("out")}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("account")}
              </NavLink>
            </li>
          )}

        
        </ul>
      </header>
    </div>
  );
};

export default Header;
