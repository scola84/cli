import Handlebars from 'handlebars'

export function generateContent (content, data) {
  content = content
    .replace(/\n\s+(\/\*comma)/g, '$1')
    .replace(/\{/g, '<<<')
    .replace(/\}/g, '>>>')
    .replace(/_L/g, '{{')
    .replace(/R_/g, '}}')
    .replace(/\/\*\s?/g, '{{')
    .replace(/\s?\*\//g, '}}')

  content = Handlebars.compile(content)(data)

  content = content
    .replace(/<<</g, '{')
    .replace(/>>>/g, '}')
    .replace(/(\w+)\['(\w+)'\]/g, '$1.$2')
    .replace(/\['(\w+)'\]/g, '$1')

  return content
}