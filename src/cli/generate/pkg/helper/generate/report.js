export function generateReport (box, data, callback) {
  data.sort((a, b) => {
    return (a.link || '') > (b.link || '')
  })

  const lines = []

  lines.push('Generated files for:')

  if (data.length > 0) {
    lines.push(data.map((d) => {
      return `  ${d.object}${(d.link ? `-${d.link}` : '')}`
    }).join('\n'))
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Cleaned files:')

  if (box.cleaned.length > 0) {
    lines.push(`  ${box.cleaned.sort().join('\n  ')}`)
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Unchanged files:')

  if (box.unchanged.length > 0) {
    lines.push(`  ${box.unchanged.sort().join('\n  ')}`)
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Unprovisioned files:')

  if (box.unprovisioned.length > 0) {
    lines.push(`  ${box.unprovisioned.sort().join('\n  ')}`)
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Changed files:')

  if (box.changed.length > 0) {
    lines.push(`  ${box.changed.sort().join('\n  ')}`)
  } else {
    lines.push('  <none>')
  }

  lines.push('')
  lines.push('Failed files:')

  if (box.failed.length > 0) {
    lines.push(`  ${box.failed.sort().join('\n  ')}`)
  } else {
    lines.push('  <none>')
  }

  lines.push('')

  if (box.dryRun === true) {
    lines.push('NOTE: this was a dry run.')
    lines.push('')
  }

  callback(null, lines)
}
