import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export const __filename = fileURLToPath(import.meta.url)

export const __srcDirname = join(dirname(__filename), '..')