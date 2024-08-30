import { writable } from 'svelte/store';

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1
}

export const appStatus = writable(APP_STATUS.CHAT_MODE)
export const appStatusInfo = writable({
    id: 'f6f2483eb802fac91ba9f5e3acf6d19b', 
    url: 'https://res.cloudinary.com/dvxeoteja/image/upload/v1725015756/pdf/heixxwh8aeq56g2jlx4y.pdf', 
    pages: 4})

export const setAppStatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING);
}

export const setAppStatusChatMode = ({id, url, pages} : { id: string, url: string, pages: number }) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    appStatusInfo.set({id, url, pages});
}

export const setAppStatusError = () => {
    appStatus.set(APP_STATUS.ERROR);
}