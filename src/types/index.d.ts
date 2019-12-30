declare module 'discord-verify';

export interface IModify { 
    token: string; 
    password: string; 
    email?: string; 
    new_password?: string; 
    avatar?: string; 
    language?: string;
}

export interface IModifyUser {
    id: string,
    username: string,
    avatar: string,
    discriminator: string|number;
    email: string;
    verified: boolean;
    locale: string;
    mfa_enabled: boolean;
    phone?: string;
    flags: number;
}

export interface IFingerprint {
    fingerprint: string;
    assignments: number[][];
}

export interface IPhoneSuccess {
    message: string;
    retry_after?: number;
    code?: number
}