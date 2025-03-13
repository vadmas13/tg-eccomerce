export const parseAttributes = (attributes: string): Record<string, string> => {
  const result: Record<string, string> = {};

  // Разделяем строки по точке с запятой или переносу строки
  const pairs = attributes.split(/;\s*|\n\s*/);

  for (const pair of pairs) {
    // Убираем лишние пробелы и проверяем на пустую строку
    const trimmedPair = pair.trim();
    if (trimmedPair) {
      const [key, value] = trimmedPair.split(/:\s*/);

      // Проверяем, что ключ и значение не пустые
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    }
  }

  return result;
};
