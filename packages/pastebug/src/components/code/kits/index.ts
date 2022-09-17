import { PasteKind } from 'models/paste'
import { Kit } from 'models/kit'
import javascript from './javascript'
import python from './python'


const kits:Array<Kit> = [
    javascript,
    python
]

const kitMap = new Map<PasteKind, Kit>()

for(const kit of kits) {
    kitMap.set(kit.kind, kit)
}

export { kits, kitMap }