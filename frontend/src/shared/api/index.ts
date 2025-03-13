import axios from "axios";

// Создание экземпляра Axios с предустановленными настройками
const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Замените на ваш базовый URL
  timeout: 10000, // Время ожидания запроса в миллисекундах
  headers: {
    "Content-Type": "application/json",
    // Добавьте другие заголовки, если необходимо
  },
});

// Обработка запросов
axiosInstance.interceptors.request.use(
  (config) => {
    // Здесь вы можете добавить токены аутентификации или другие настройки
    const token = localStorage.getItem("token"); // Пример получения токена из localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Обработка ответов
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Возвращаем только данные ответа
  },
  (error) => {
    // Здесь можно обработать ошибки
    if (error.response) {
      // Запрос был сделан, и сервер ответил кодом, который выходит за пределы 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // Запрос был сделан, но ответа не получено
      console.error("Error request:", error.request);
    } else {
      // Произошла ошибка при настройке запроса
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
