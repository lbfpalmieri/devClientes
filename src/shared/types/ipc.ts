
export interface Custumer{
    _id: string;
    _rev?: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
    adress?: string;
    phone?: string;
}

export interface NewCustumer{
    name: string;
    email: string;
    role: string;
    status: boolean;
    adress?: string;
    phone?: string;
}
