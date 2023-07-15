import store from "@/store";
import ru from './ru-RU.json'
import ua from './uk-UA.json'
import en from './en-US.json'

export const localeFlag = [
    { flag: 'uk-UA', value: 'Українська' },
    { flag: 'ru-RU', value: 'Русский' },
    { flag: 'en-US', value: 'English' }
]

const locales = {
    'uk-UA': ua,
    'ru-RU': ru,
    'en-US': en,
}

export function getLocalizedText(key) {

    const userLang = navigator.language || navigator.userLanguage; 


    const locale = store.getters["requests/clientInfo"].locale || userLang || 'uk-UA'

    return locales[locale][key] || `[Localize error]: key ${key} not found`
}