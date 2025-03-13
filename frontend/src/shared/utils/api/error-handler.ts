import { notFound } from "next/navigation";
import { typography } from "../../consts";
import { ApiNotFoundError, ApiPropertyError } from "../../models";

const isPropertyErrors = (error: unknown): error is ApiPropertyError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  Array.isArray(error.message) &&
  "property" in error.message[0] &&
  "message" in error.message[0];

const isNotFoundMessage = (error: unknown): error is ApiNotFoundError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  "statusCode" in error &&
  typeof error.message === "string" &&
  error.statusCode === 404;

const isOtherMessage = (error: unknown): error is ApiNotFoundError =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  "statusCode" in error &&
  typeof error.message === "string";

export const handleErrorMsg = (error: unknown): string => {
  if (isPropertyErrors(error)) {
    const [{ message, property }] = error.message;
    return `${message}: ${property}`;
  } else if (isNotFoundMessage(error)) {
    return notFound();
  } else if (isOtherMessage(error)) {
    return error.message;
  }

  console.log("error", error);

  return `${typography.unknownError}: ${error}`;
};
