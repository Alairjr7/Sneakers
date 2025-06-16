import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

import Logo from "../../assets/logo.svg";
import IconCart from "../../assets/icon-cart.svg";
import IconCartButton from "../../assets/icon-cart-button.svg";
import IconDelete from "../../assets/icon-delete.svg";
import IconMenu from "../../assets/icon-menu.svg";
import IconClose from "../../assets/icon-close.svg";
import ImageAvatar from "../../assets/image-avatar.png";
import ImageProduct1 from "../../assets/image-product-1.jpg";
import ImageProduct2 from "../../assets/image-product-2.jpg";
import ImageProduct3 from "../../assets/image-product-3.jpg";
import ImageProduct4 from "../../assets/image-product-4.jpg";
import ImageProductThumbnail1 from "../../assets/image-product-1-thumbnail.jpg";
import ImageProductThumbnail2 from "../../assets/image-product-2-thumbnail.jpg";
import ImageProductThumbnail3 from "../../assets/image-product-3-thumbnail.jpg";
import ImageProductThumbnail4 from "../../assets/image-product-4-thumbnail.jpg";
import Minius from "../../assets/icon-minus.svg";
import Plus from "../../assets/icon-plus.svg";

const List = ({ text, onClick, isActive }) => {
  return (
    <li
      className={`text-Grayishblue hover:text-Verydarkblue hover:underline decoration-primary decoration-[4px] underline-offset-[2.7rem] transition-all ease-in-out duration-300 ${
        isActive ? "text-Verydarkblue underline" : ""
      }`}
      onClick={onClick}
    >
      <a href="#">{text}</a>
    </li>
  );
};
const ListMobile = ({ text, onClick, isActive }) => {
  return (
    <li
      className={`text-black hover:text-primary font-semibold transition-all ease-in-out duration-300 ${
        isActive ? "text-primary" : ""
      }`}
      onClick={onClick}
    >
      <a href="#">{text}</a>
    </li>
  );
};

const Thumbnail = ({ Image, alt, isActive, onClick }) => {
  return (
    <div
      className={`max-w-[100px] max-h-[100px] w-full h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-65 ${
        isActive ? "border-2 border-primary" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={Image}
        alt={alt}
        className={`w-full h-full object-cover ${isActive ? "opacity-65" : ""}`}
      />
    </div>
  );
};

export default function Home() {
  const [link, setLink] = useState("Women");
  const handleLinkClick = (link) => setLink(link);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMenu, setmodalMenu] = useState(false);
  const ArrayProductsImageThumbnail = [
    ImageProductThumbnail1,
    ImageProductThumbnail2,
    ImageProductThumbnail3,
    ImageProductThumbnail4,
  ];

  const ArrayProductsImage = [
    ImageProduct1,
    ImageProduct2,
    ImageProduct3,
    ImageProduct4,
  ];

  const [productImage, setProductImage] = useState(0);
  const changeProductimage = (index) => {
    setProductImage(index);
  };

  const [amount, setAmount] = useState(1);
  const increaseQuantity = () => setAmount(amount + 1);
  const decreaseQuantity = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  useEffect(() => {
    try {
      const savedAmount = localStorage.getItem("amount");

      if (savedAmount) {
        setAmount(JSON.parse(savedAmount));
      }
    } catch (error) {
      console.error("Erro ao carregar amount do localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("amount", JSON.stringify(amount));
    } catch (error) {
      console.error("Erro ao salvar amount no localStorage", error);
    }
  }, [amount]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartLocalStorage = localStorage.getItem("cart");
    setCart(cartLocalStorage ? JSON.parse(cartLocalStorage) : []);
  }, []);

  const addProductToCart = () => {
    const product = {
      image: ImageProductThumbnail1,
      text: "tênis de edição limitada de outono",
      amount: amount,
    };
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setAmount(1);
  };

  const removeProductFromCart = (indexToRemove) => {
    setCart((prevCart) =>{
       const updatedCart = prevCart.filter((_, index) => index !== indexToRemove)
       localStorage.setItem("cart", JSON.stringify(updatedCart))
       return updatedCart;
    }
      
    );
  };
  const subtotalByProduct = cart.map((product) => 125 * product.amount);
  const grandTotal = subtotalByProduct.reduce((acc, cur) => acc + cur, 0);

  return (
    <main className="2xl:px-50 md:px-20 px-5">
      <header className="flex items-center justify-between border-b border-Grayishblue h-[100px]">
        <div className="flex items-center gap-4">
          <img
            src={IconMenu}
            className="lg:hidden "
            onClick={() => setmodalMenu(true)}
          />
          <img src={Logo} alt="Logo" />
        </div>
        <Modal
          isOpen={modalMenu}
          onRequestClose={() => setmodalMenu(false)}
          className="bg-white max-w-[300px] w-full h-full outline-none p-8 absolute transition-all duration-500"
          overlayClassName="fixed inset-0  bg-black/75 "
        >
          <img src={IconClose} onClick={() => setmodalMenu(false)} />
          <nav className="mt-10">
            <ul className="flex flex-col gap-5">
              <ListMobile
                text="Coleções"
                onClick={() => handleLinkClick("Collections")}
                isActive={link === "Collections"}
              />
              <ListMobile
                text="Homens"
                onClick={() => handleLinkClick("Men")}
                isActive={link === "Men"}
              />
              <ListMobile
                text="Mulheres"
                onClick={() => handleLinkClick("Women")}
                isActive={link === "Women"}
              />
              <ListMobile
                text="Sobre"
                onClick={() => handleLinkClick("About")}
                isActive={link === "About"}
              />
              <ListMobile
                text="Contato"
                onClick={() => handleLinkClick("Contact")}
                isActive={link === "Contact"}
              />
            </ul>
          </nav>
        </Modal>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10">
            <List
              text="Coleções"
              onClick={() => handleLinkClick("Collections")}
              isActive={link === "Collections"}
            />
            <List
              text="Homens"
              onClick={() => handleLinkClick("Men")}
              isActive={link === "Men"}
            />
            <List
              text="Mulheres"
              onClick={() => handleLinkClick("Women")}
              isActive={link === "Women"}
            />
            <List
              text="Sobre"
              onClick={() => handleLinkClick("About")}
              isActive={link === "About"}
            />
            <List
              text="Contato"
              onClick={() => handleLinkClick("Contact")}
              isActive={link === "Contact"}
            />
          </ul>
        </nav>
        <div className="flex items-center gap-10">
          <div className="relative">
            <img
              src={IconCart}
              alt="Icone Carrinho"
              className="cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            />
            {cart.length > 0 && (
              <span className=" flex items-center justify-center text-sm absolute -right-2 -top-3 bg-primary text-white rounded-full w-[15px] h-[15px]">
                {cart.length}
              </span>
            )}
          </div>
          <img
            src={ImageAvatar}
            alt="Imagem Perfil"
            className="w-[50px] h-[50px] cursor-pointer hover:border-[2px] rounded-full border-primary"
          />
        </div>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="
        w-[400px] h-auto absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        md:top-24 md:right-24 md:left-auto md:translate-x-0 md:translate-y-0
        bg-white outline-none shadow-lg rounded-lg"
        overlayClassName="fixed inset-0 md:bg-transparent bg-black/75 "
      >
        <div className="flex flex-col gap-5">
          <h3 className="border-b border-Grayishblue p-5 font-bold text-black">
            Carrinho
          </h3>
          <div>
            {cart.length <= 0 ? (
              <p className="text-Darkgrayishblue font-semibold py-20 text-center">
                Seu carrinho está vazio
              </p>
            ) : (
              <div className="flex flex-col items-center gap-5">
                {cart.map((product, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <div className="max-w-[50px] max-h-[50px] h-full w-full overflow-hidden rounded-sm">
                      <img
                        src={product.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="capitalize text-Darkgrayishblue">
                          {product.text}
                        </p>

                        <p className="text-Darkgrayishblue">
                          R$125,00 x {product.amount}
                          <span className="text-black font-semibold">{` R$${subtotalByProduct[index]},00`}</span>
                        </p>
                      </div>

                      <img
                        src={IconDelete}
                        onClick={() => removeProductFromCart(index)}
                      />
                    </div>
                  </div>
                ))}
                <div className=" w-full">
                  <p className="p-5 font-semibold">
                    Total: <span>R${grandTotal},00</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center  text-black font-semibold bg-primary py-4 px-24 rounded-lg cursor-pointer mb-10"
                >
                  Comprar
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <section className="flex justify-around lg:mt-[100px] mt-12 gap-5 flex-wrap">
        <div className="flex flex-col gap-10">
          <div className="max-w-[500px] w-full max-h-[500px] h-full rounded-2xl overflow-hidden bg-Black">
            <img
              src={ArrayProductsImage[productImage]}
              alt="Imagem Produto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between gap-2 md:gap-0">
            {ArrayProductsImageThumbnail.map((image, index) => (
              <Thumbnail
                Image={image}
                alt={`Imagem produto ${index + 1}`}
                key={index}
                onClick={() => changeProductimage(index)}
                isActive={productImage === index}
              />
            ))}
          </div>
        </div>
        <div className="max-w-[500px] w-full flex flex-col lg:gap-10 gap-5 mt-10 lg:mt-0 px-5 md:px-0">
          <h3 className="uppercase text-Darkgrayishblue font-semibold">
            sneaker company
          </h3>
          <h2 className="capitalize text-black font-bold md:text-4xl text-3xl">
            tênis de edição limitada de outono
          </h2>
          <p className="text-Darkgrayishblue">
            Estes tênis de perfil baixo são a sua companhia perfeita para o uso
            casual. Com um solado de borracha durável, eles resistem a tudo o
            que o clima pode oferecer.
          </p>
          <div className="flex flex-row md:flex-rol gap-3 justify-between md:justify-normal">
            <p className="flex items-center gap-2 text-black font-bold text-2xl">
              R$125,00
              <span className="p-1 bg-black text-white font-semibold rounded-md text-sm">
                50%
              </span>
            </p>
            <p className="text-Darkgrayishblue font-semibold line-through">
              R$250,00
            </p>
          </div>
          <div className=" flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 mb-10 lg:mb-0 w-full">
            <div className="flex items-center justify-center gap-10 bg-Lightgrayishblue shadow p-4 rounded-lg w-full">
              <img
                src={Minius}
                className="cursor-pointer"
                onClick={decreaseQuantity}
              />
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                className="w-[100px] text-center"
                disabled
              />
              <img
                src={Plus}
                className="cursor-pointer"
                onClick={increaseQuantity}
              />
            </div>
            <div className="w-full">
              <button
                type="button"
                className="flex items-center justify-center gap-4 text-black font-semibold bg-primary p-4 rounded-lg cursor-pointer w-full"
                onClick={addProductToCart}
              >
                {" "}
                <img src={IconCartButton} className="w-[20px]" /> Adicionar ao
                carrinho
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
