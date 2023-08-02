// typescript

export interface FormInputs {
    username?: string;
    email: string;
    password: string;
}

export interface Register {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

export interface Login {
    token: string;
    user: {
      username: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
    } 
}

export interface User {
    user: {
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        _id: string;
    } 
}
