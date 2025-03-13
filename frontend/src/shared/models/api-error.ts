export type ApiPropertyError = {
  statusCode: number;
  message: {
    property: string;
    message: string;
    fieldName?: string;
  }[];
};

export type ApiNotFoundError = {
  statusCode: number;
  message: string;
};
