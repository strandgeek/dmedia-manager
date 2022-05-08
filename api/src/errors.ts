import { Response } from 'express';


interface ApiError {
  key: string;
  status: number;
  message: string;
}

export const sendApiError = (res: Response, err: ApiError) => {
  res.status(err.status).json(err);
}

export const API_ERRORS: {
  [key: string]: ApiError
} = {
  INTERNAL_SERVER_ERROR: {
    key: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Internal Server Error',
  },
  UNAUTHORIZED: {
    key: 'UNAUTHORIZED',
    status: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    key: 'FORBIDDEN',
    status: 403,
    message: 'Forbidden',
  },
  BAD_REQUEST: {
    key: 'BAD_REQUEST',
    status: 400,
    message: 'Bad Request',
  }
}
