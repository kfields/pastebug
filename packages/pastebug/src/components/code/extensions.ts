import { getLanguage } from './languages';
//import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
//const extensions = [javascript(), oneDark]

async function loadExtensions(language: string) {
    const ld = getLanguage(language)
    if (ld) {
        return [await ld.load(), oneDark]
    }
    else {
        return [oneDark]
    }
}
export { loadExtensions }