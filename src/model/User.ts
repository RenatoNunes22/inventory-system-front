/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
    email: string;
    cpf: string;
    name: string;
    dn: string;
    role: number;
    telephone: string;
    password: string;
    productSold: any[];
    createdAt: string;
  }