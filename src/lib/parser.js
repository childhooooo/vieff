function parse(value) {
  return value
         .split('\n')
         .map(line => parseLine(line))
         .filter(x => x)
}

function parseLine(line) {
  const tokens = line
                 .split(/[ 　]+/)
                 .filter(t => t)
  const time = parseFloat(tokens[tokens.length - 1])

  if(tokens.length < 2) return null
  if(tokens[0].match(/^#.*/)) return null
  if(!time || time < .1) return null

  return {
    name: tokens.slice(0, -1).join(' '),
    time: time
  }
}

function search(task, value) {
  return value
         .split('\n')
         .findIndex(line => searchLine(task, line))
}

function searchLine(task, line) {
  const parsed = parseLine(line)
  if(!parsed) return false
  return task.name === parsed.name && task.time === parsed.time
}

export default {
  parse,
  search
}
