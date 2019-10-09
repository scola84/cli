import Handlebars from 'handlebars'

export function generateContent (content, data) {
  let generatedContent = content

  generatedContent = generatedContent
    .replace(/\n\s+(\/\*comma)/g, '$1')
    .replace(/\{/g, '<<<')
    .replace(/\}/g, '>>>')
    .replace(/_L/g, '{{')
    .replace(/R_/g, '}}')
    .replace(/\/\*\s?/g, '{{')
    .replace(/\s?\*\//g, '}}')

  generatedContent = Handlebars.compile(generatedContent)(data)

  generatedContent = generatedContent
    .replace(/<<</g, '{')
    .replace(/>>>/g, '}')
    .replace(/(\w+)\['(\w+)'\]/g, '$1.$2')
    .replace(/\['(\w+)'\]/g, '$1')

  return generatedContent
}
