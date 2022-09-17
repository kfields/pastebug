import {LanguageDescription} from '@codemirror/language'
import { languages } from '@codemirror/language-data'

const languageMap = new Map<string, LanguageDescription>()
const languageNames: Array<string> = []

for(const language of languages) {
    languageNames.push(language.name)
    languageMap.set(language.name, language)
}

function loadLanguageExtension(name: string) {
    return languageMap.get(name)?.load()
}

function getLanguage(name: string) {
    return languageMap.get(name)
}

export { LanguageDescription, languages, languageNames, getLanguage, loadLanguageExtension }