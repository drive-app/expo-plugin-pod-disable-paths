const fs = require('fs')
const path = require('path')

const { withDangerousMod, withPlugins } = require('@expo/config-plugins')

const withDisablePodInputOutputPaths = c => {
  console.log("> :disable_input_output_paths => true");
  return withDangerousMod(c, [
    'ios',
    async config => {
      const file = path.join(config.modRequest.platformProjectRoot, 'Podfile')
      const contents = await fs.promises.readFile(file, 'utf8')
      await fs.promises.writeFile(
        file,
        disablePodInputOutputPaths(contents),
        'utf8',
      )
      return config
    },
  ])
}

const disablePodInputOutputPaths = src => {
  if (src.search(':disable_input_output_paths') > -1) return src

  const lines = src.split(/\r?\n/)
  let index = lines.findIndex(line => line.startsWith(`install! 'cocoapods'`))

  while (index < lines.length) {
    if (!lines[index].endsWith(','))
      return src.replace(
        lines[index],
        `${lines[index]},\n  :disable_input_output_paths => true`,
      )

    index++
  }

  return src
}

module.exports = config => withPlugins(config, [withDisablePodInputOutputPaths])
