import { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../api/endpoints";
import * as AntDesign from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { WEBSITE } from "../../config";
import { Mobile } from "../../hooks";
import Menu from "../Menu/Menu";
import Drawer from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { cartApi } from "../../api/endpoints";

export default function Header() {
  const [messageApi, contextHolder] = AntDesign.message.useMessage();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isMobile = Mobile.useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);
  const [logout, { isLoading }] = authApi.useLogoutMutation();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const { data: cartData, isLoading: cartIsLoading } =
    cartApi.useGetCartsQuery();

  const items = [
    {
      key: "1",
      label: (
        <Link to="/design/shirts" className="uppercase text-xl">
          shirts
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/design/polo-shirts" className="uppercase text-xl">
          polo shirts
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/design/coats" className="uppercase text-xl">
          coats
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to="/design/overcoats" className="uppercase text-xl">
          overcoats
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link to="/design/pants" className="uppercase text-xl">
          pants
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link to="/design/jeans" className="uppercase text-xl">
          jeans
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link to="/design/chinos" className="uppercase text-xl">
          chinos
        </Link>
      ),
    },
    // {
    //   key: "8",
    //   label: (
    //     <Link to="/design/suits" className="uppercase text-xl">
    //       suits
    //     </Link>
    //   ),
    // },
    // {
    //   key: "9",
    //   label: (
    //     <Link to="/design/shoes" className="uppercase text-xl">
    //       shoes
    //     </Link>
    //   ),
    // },
    // {
    //   key: "10",
    //   label: (
    //     <Link to="/design/accessories" className="uppercase text-xl">
    //       accessories
    //     </Link>
    //   ),
    // },
  ];

  const mobileItems = [
    {
      key: "1",
      label: (
        <Link
          to="/design/shirts"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          shirt
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/design/polo-shirts"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          polo shirts
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          to="/design/coats"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          coats
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link
          to="/design/overcoats"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          overcoats
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link
          to="/design/pants"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          pants
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link
          to="/design/jeans"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          jeans
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link
          to="/design/chinos"
          className="uppercase text-xl"
          onClick={toggleNav}
        >
          chinos
        </Link>
      ),
    },
    // {
    //   key: "8",
    //   label: (
    //     <Link
    //       to="/design/suits"
    //       className="uppercase text-xl"
    //       onClick={toggleNav}
    //     >
    //       suits
    //     </Link>
    //   ),
    // },
    // {
    //   key: "9",
    //   label: (
    //     <Link
    //       to="/design/shoes"
    //       className="uppercase text-xl"
    //       onClick={toggleNav}
    //     >
    //       shoes
    //     </Link>
    //   ),
    // },
    // {
    //   key: "10",
    //   label: (
    //     <Link
    //       to="/design/accessories"
    //       className="uppercase text-xl"
    //       onClick={toggleNav}
    //     >
    //       accessories
    //     </Link>
    //   ),
    // },
  ];

  return (
    <>
      <header className="h-20 z-40 w-screen fixed bg-bgColor text-white uppercase shadow-lg backdrop-blur-md px-4 md:px-20">
        <Drawer isOpen={isOpen}>
          <nav
            style={{ height: "calc(100dvh - 5rem)" }}
            className="flex flex-col py-[3rem] justify-between items-center bg-bgColor z-30"
          >
            <ul className="w-full flex flex-col text-center gap-[6dvh] px-4">
              <li>
                <AntDesign.Dropdown
                  menu={{
                    items: mobileItems,
                    className: "flex flex-col gap-2 p-4",
                  }}
                  placement="bottom"
                >
                  <button className="text-xl uppercase">Shop</button>
                </AntDesign.Dropdown>
              </li>
              <li>
                <Link to="/about-us" className="text-xl" onClick={toggleNav}>
                  About
                </Link>
              </li>
              {isLogin ? (
                <>
                  <li>
                    <Link to="/cart" className="text-xl" onClick={toggleNav}>
                      <ShoppingCartOutlined className="text-3xl" />
                    </Link>
                  </li>
                  <li>
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/profile"
                          className="text-xl"
                          onClick={toggleNav}
                        >
                          <AntDesign.Avatar icon={<UserOutlined />} />
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="text-xl"
                          onClick={toggleNav}
                        >
                          <AntDesign.Avatar icon={<UserOutlined />} />
                        </Link>
                      </>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-xl" onClick={toggleNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-xl" onClick={toggleNav}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="flex flex-col text-center gap-[6dvh] ">
              <li>
                <h1 className="font-bold text-xl">{WEBSITE.NAME}</h1>
              </li>
            </ul>
          </nav>
        </Drawer>
        <nav className="h-full w-full flex flex-row justify-between items-center text-center md:justify-between">
          <ul className="h-fit w-fit flex flex-row justify-center items-center gap-6">
            <li className="h-fit w-fit">
              <Link
                className="transition-all duration-300"
                to="/"
                style={{ fontSize: "clamp(1.5rem, 5vw, 1.5vw)" }}
              >
                {WEBSITE.NAME}
              </Link>
            </li>
          </ul>
          {!isMobile ? (
            <>
              <ul className="h-fit w-fit flex flex-row justify-center items-center gap-14">
                <li>
                  <AntDesign.Dropdown
                    menu={{ items, className: "flex flex-col gap-2 p-4" }}
                    placement="bottom"
                  >
                    <button className="text-xl uppercase">Shop</button>
                  </AntDesign.Dropdown>
                </li>
                <li>
                  <Link to="/about-us" className="text-xl">
                    About Us
                  </Link>
                </li>
              </ul>
              <ul className="h-fit w-fit flex flex-row items-center gap-14">
                {isLogin ? (
                  <>
                    <li>
                      <Link to="/cart" className="flex gap-3 text-xl">
                        <ShoppingCartOutlined className="text-3xl" />
                        {cartData?.data?.carts.length > 0 && (
                          <>{cartData?.data?.carts.length}</>
                        )}
                      </Link>
                    </li>
                    <li>
                      {isAdmin ? (
                        <>
                          <Link to="/admin/profile" className="text-xl">
                            <AntDesign.Avatar icon={<UserOutlined />} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/profile" className="text-xl">
                            <AntDesign.Avatar icon={<UserOutlined />} />
                          </Link>
                        </>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="text-xl">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="text-xl">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </>
          ) : (
            <>
              <ul className="h-fit w-fit flex flex-row justify-center items-center">
                <li>
                  <Menu toggleNav={toggleNav} isOpen={isOpen} />
                </li>
              </ul>
            </>
          )}
        </nav>
        {contextHolder}
      </header>
    </>
  );
}
