import { PasteKind } from 'models/paste'

class Kit {
  kind: PasteKind
  name: string
  editor: string

  constructor(kind: PasteKind, name: string, editor: string) {
    this.kind = kind
    this.name = name;
    this.editor = editor;
  }
}

export { Kit }
