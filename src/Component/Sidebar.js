import { BsSearch, BsFillPersonFill, BsBoxArrowRight } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AiOutlineLogin } from "react-icons/ai";

function Sidebar({ isOpen, setIsOpen, cartIsOpen, setCartIsOpen }) {
  const { user } = useContext(UserContext);
  const history = useHistory();

  function logOut() {
    if (!user) return;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/logOut`,
      config
    );
    request.then((response) => {
      localStorage.removeItem("user");
      history.push("/Login");
    });

    request.catch((error) => {
      alert("Falha ao sair!");
    });
  }

  return (
    <>
      <div id="header">
        <ProSidebar width={"200px"}>
          <SidebarHeader>
            <Logo>CampMarket</Logo>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              <MenuItem icon={<FiHome />}>
                Home
                <Link to={"/"} />
              </MenuItem>
              <MenuItem
                onClick={() => setCartIsOpen(!cartIsOpen)}
                icon={<FiShoppingCart />}
              >
                Carrinho
              </MenuItem>
              <MenuItem icon={<BsFillPersonFill />}>
                Perfil
                <Link to={"/profile"} />
              </MenuItem>
              <SubMenu icon={<IoFastFoodSharp />} title="Categorias">
                <MenuItem>
                  <p>Hortifruti</p>
                  <Link to={"/category/vegetables"} />
                </MenuItem>
                <MenuItem>
                  <p>Carnes e Peixes</p>
                  <Link to={"/category/meat"} />
                </MenuItem>
                <MenuItem>
                  <p>Frios e laticínios</p>
                  <Link to={"/category/cold"} />
                </MenuItem>
              </SubMenu>
              <MenuItem onClick={() => setIsOpen(!isOpen)} icon={<BsSearch />}>
                Busca
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu>
              {user ? (
                <MenuItem icon={<BsBoxArrowRight />} onClick={() => logOut()}>
                  Logout
                </MenuItem>
              ) : (
                <MenuItem icon={<AiOutlineLogin />}>
                  Login
                  <Link to={"/Login"} />
                </MenuItem>
              )}
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
}

const Logo = styled.div`
  display: flex;
  height: 60px;
  font-size: 20px;
  padding: 0 20px;
  color: #000;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export default Sidebar;
