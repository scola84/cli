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
  lines.push('Cleaned files:');

  if (box.cleaned.length) {
    lines.push('  ' + box.cleaned.join('\n  '));
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

  lines.push('');
  lines.push('Failed files:');

  if (box.failed.length) {
    lines.push('  ' + box.failed.join('\n  '));
  } else {
    lines.push('  <none>');
  }

  lines.push('');

  if (box.failed.length) {
    lines.push('NOTE: there are failed files.');
    lines.push('');
  }

  if (box.dryRun) {
    lines.push('NOTE: this was a dry run.');
    lines.push('');
  }

  callback(null, lines);
}
