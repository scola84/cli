export function generateReport (box, data, callback) {
  data.sort((a, b) => {
    return (a.link || '') > (b.link || '')
  })

  const lines = []

  lines.push('Generated files for:')

  if (data.length) {
    lines.push(data.map((d) => {
      return `  ${d.object}` + (d.link ? `-${d.link}` : '')
    }).join('\n'))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Cleaned files:')

  if (box.cleaned.length) {
    lines.push('  ' + box.cleaned.sort().join('\n  '))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Unchanged files:')

  if (box.unchanged.length) {
    lines.push('  ' + box.unchanged.sort().join('\n  '))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Unprovisioned files:')

  if (box.unprovisioned.length) {
    lines.push('  ' + box.unprovisioned.sort().join('\n  '))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Changed files:')

  if (box.changed.length) {
    lines.push('  ' + box.changed.sort().join('\n  '))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Failed files:')

  if (box.failed.length) {
    lines.push('  ' + box.failed.sort().join('\n  '))
  } else {
    lines.push('  <none>')
  }

  lines.push('')

  if (box.dryRun) {
    lines.push('NOTE: this was a dry run.')
    lines.push('')
  }

  callback(null, lines)
}
