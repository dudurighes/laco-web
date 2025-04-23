export class DefaultResponse<T> {
    public message: string
    public result: T
}

interface Meta {
  currentPage: number;
  itemsPerPage: number;
  totalOfItems: number;
  totalOfPages: number;
}

interface Result {
  street: string;
  complement: string;
  district: string;
  districtId: string;
  city: string;
  cityId: string;
  ibgeId: string;
  state: string;
  stateIbgeId: string | null;
  stateShortname: string;
  zipcode: string;
}

export interface CepResponse {
  meta: Meta;
  result: Result;
}
