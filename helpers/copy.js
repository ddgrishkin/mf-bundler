import { resolve, dirname, basename, join } from 'node:path'
import { copyFile, mkdir } from 'node:fs/promises'
import { async as glob } from 'fast-glob'

export const copy = async (src, dest) => {
  const source = typeof src === 'string' ? [src] : src

  if (source.length === 0 || !dest) {
    throw new TypeError('`src` and `dest` are required')
  }

  const sourceFiles = await glob(source, {
    cwd,
    dot: true,
    absolute: false,
    stats: false,
  })

  const destRelativeToCwd = cwd ? resolve(cwd, dest) : dest

  return Promise.all(
    sourceFiles.map(async (p) => {
      const dirName = dirname(p)
      const baseName = basename(p)

      const from = cwd ? resolve(cwd, p) : p
      const to = parents
        ? join(dest, dirName, baseName)
        : join(dest, baseName)

      // Ensure the destination directory exists
      await mkdir(dirname(to), { recursive: true })

      return copyFile(from, to)
    })
  )
}
