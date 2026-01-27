export type RegisterResult =
    | { success: true }
    | { success: false; error: 'EMAIL_EXISTS'};

export type LoginResult =
    |{ success: true }
    | { success: false; error: 'EMAIL_NOT_FOUND' | 'WRONG_PASSWORD' };