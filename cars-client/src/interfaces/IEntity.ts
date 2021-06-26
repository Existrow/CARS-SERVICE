export interface IUser{
    id: number,
    login: string,
    email: string,
    "access-token": string,
}

export interface IColor {
    id: number;
    rgb: string;
    name: string;
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IBodyType{
    id:number;
    name:string
}

export interface IModel {
    id: number;
    name: string;
    engineCapacity:string;
    hp:number;
    engineType:IEngineType;
    brand:IBrand;
    bodyType:IBodyType;
    yearRelease: number;
    transmission: ITransmission;
    driveUnits: IDriveUnits;
    generation: IGeneration;
    wheelPosition: string | null;
}

export interface IGeneration{
    id:number;
    name:string;
    yearFrom: number;
    yearTo:number
}

export interface IDriveUnits{
    id:number;
    type:string
}

export interface INews {
    title:string;
    urlToImage:string;
    url:string;

}

export interface IAd {
    id: number;
    countOwners: number;
    vin: string;
    plateNumber: string;
    mileage: number;
    description: string;
    salePlace: string;
    price: number;
    model: IModel;
    user: IUser;
    isSold: boolean
}


export interface IAdCompareDto {
    id: number;
    ad:IAd;
}

export interface IEngineType{
    id:number;
    name:string
}

export interface IYearRelease{
    year_release:string
}

export interface ITransmission{
    id:number;
    type:string
}