export function generateReport(box, data, callback) {
  const lines = [];

  lines.push('Generated files for:');

  if (data.length) {
    lines.push(data.map((d) => {
      return `  ${d.object}` + (d.link ? `-${d.link}` : '');
    }).join('\n'));
  } else {
    lines.push('  <none>');
  }

  lines.push('');
  lines.push('Changed files:');

  if (box.changed.length) {
    lines.push('  ' + box.changed.join('\n  '));
  } else {
    lines.push('  <none>');
  }

  lines.push('');
  lines.push('Unchanged files:');

  if (box.unchanged.length) {
    lines.push('  ' + box.unchanged.join('\n  '));
  } else {
    lines.push('  <none>');
  }

  lines.push('');
  lines.push('Unprovisioned files:');

  if (box.unprovisioned.length) {
    lines.push('  ' + box.unprovisioned.join('\n  '));
  } else {
    lines.push('  <none>');
  }

  callback(null, lines);
}
