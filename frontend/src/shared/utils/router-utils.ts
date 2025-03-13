export const getIdLink = (route: string, id: string, idKey = ":id") =>
  route.replace(idKey, id);
