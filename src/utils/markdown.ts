export function preserveIndentation(text: string): string {
  return text.replace(/^(\s+)/gm, (match) =>
    match.replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0').replace(/ /g, '\u00A0')
  )
}

