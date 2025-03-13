# Используем официальный образ Node.js в качестве базового
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальные файлы приложения в контейнер
COPY . .

# Устанавливаем переменные окружения
ENV BASE_URL="http://localhost:3001/api"
ENV DATABASE_URL="postgresql://admin:26011948@postgres:5432/tg_ecommerce" 
ENV JWT_EXP="1d"
ENV JWT_SECRET="23234v25435b453b634b6456342234523b5235"
ENV NODE_ENV="development"

# Генерируем Prisma Client, если используете Prisma
RUN npx prisma generate

# Компилируем приложение
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3001

# Запускаем приложение
CMD ["node", "dist/main"]