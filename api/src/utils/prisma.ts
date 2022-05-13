import { Request } from "express";


const getNumberFromRequestQuery = (req: Request, fieldName: string, defaultValue: number): number => {
  const valueStr = req.query[fieldName] as string;
  if (!valueStr) {
    return defaultValue;
  }
  const value = parseInt(valueStr);
  if (!value) {
    return defaultValue
  }
  return value;
}

export const withPage = (req: Request) => {
  const take = getNumberFromRequestQuery(req, 'limit', 16)
  const skip = getNumberFromRequestQuery(req, 'skip', 0)
  return {
    take,
    skip,
  }
}
