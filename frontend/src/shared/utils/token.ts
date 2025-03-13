import { jwtVerify } from "jose";

export async function parseAuthToken(token: string | undefined) {
  if (!token) {
    return null; // Если токен отсутствует, возвращаем null
  }

  try {
    // Убедитесь, что ваш секретный ключ хранится в переменных окружения
    const secretKey = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    );
    const userData = await jwtVerify(token.replace("Bearer ", ""), secretKey);

    return userData; // Возвращаем данные пользователя
  } catch (error) {
    console.error(
      "Ошибка при проверке токена:",
      error instanceof Error ? error.message : error,
    );
    return null; // Если токен недействителен, возвращаем null
  }
}
