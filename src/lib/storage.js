const storagePrefix = 'learning_platform_';

const storage = {
    getToken: () => {
        return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
    },
    setToken: (token) => {
        window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
    },
};

export default storage;
