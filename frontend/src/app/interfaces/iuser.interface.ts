export interface IUser {
    id: number,
    name: string,
    surname: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    code_postal: string,
    email: string
}

export interface IRegisterData {
    name: string,
    surname: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    code_postal: string,
    email: string,
    password: string
}