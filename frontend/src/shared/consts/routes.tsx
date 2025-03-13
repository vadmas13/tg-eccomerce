import {
  AppstoreOutline,
  UnorderedListOutline,
  SetOutline,
  ShopbagOutline,
  TruckOutline,
} from "antd-mobile-icons";

export const routes = {
  base: {
    url: "/",
    title: "Каталог товаров",
    icon: <ShopbagOutline />,
    catalog: {
      url: "/catalog/:id",
    },
    cart: {
      url: "/cart",
      title: "Корзина с товарами",
    },
    order: {
      create: {
        url: "/orders/create",
        title: "Создание заказа",
      },
    },
  },
  categories: {
    url: "/categories",
    title: "Категории",
    icon: <UnorderedListOutline />,
    create: {
      url: "/categories/create",
      title: "Добавить категорию",
    },
    edit: {
      url: "/categories/:id",
      title: "Редактирование категории",
    },
  },
  products: {
    url: "/products",
    title: "Товары",
    icon: <AppstoreOutline />,
    create: {
      url: "/products/create",
      title: "Добавить товар",
    },
    edit: {
      url: "/products/:id",
      title: "Редактирование товара",
    },
  },
  orders: {
    url: "/orders",
    title: "Заказы",
    icon: <TruckOutline />,
    edit: {
      url: "/orders/:id",
      title: "Редактирование заказа",
    },
  },
  settings: { url: "/settings", title: "Настройки", icon: <SetOutline /> },
} as const;
