type PasteKind = string

class Paste {
  kind: PasteKind
  title: string
  code: string

  constructor(kind: PasteKind, title: string, code: string) {
    this.kind = kind
    this.title = title
    this.code = code
  }
};

export { Paste }
