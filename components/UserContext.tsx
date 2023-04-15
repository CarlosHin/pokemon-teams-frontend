import React, { createContext, useState } from 'react';

interface IUserContext {
    user: {
        username?: string;
        token?: string;
        name?: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        username?: string;
        token?: string;
        name?: string;
    }>>;
}

export const UserContext = createContext<IUserContext>({
    user: {
        username: '',
        token: '',
        name: '',
    },
    setUser: () => { },
});

