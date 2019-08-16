import Handlebars from 'handlebars';

export function generateContent(content, data) {
  content = content
    .replace(/\n\s+(\/\*comma)/g, '$1')
    .replace(/\{/g, '<<<')
    .replace(/\}/g, '>>>')
    .replace(/\/\*/g, '{{')
    .replace(/\*\//g, '}}');

  content = Handlebars.compile(content)(data);

  content = content
    .replace(/<<</g, '{')
    .replace(/>>>/g, '}')
    .replace(/\['(\w+)'\]/g, '.$1');

  return content;
}
