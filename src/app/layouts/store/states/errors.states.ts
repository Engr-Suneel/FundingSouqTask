import { IError } from "src/app/core/interfaces/errors";

export interface ErrorState {
  hasError: boolean;
  error: IError | null
}

export const initialErrorState: ErrorState = {
  hasError: false,
  error: null
}