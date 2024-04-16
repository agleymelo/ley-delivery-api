import { resolve, dirname } from 'node:path'
import { randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import multer from 'fastify-multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TMP_FOLDER = resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_FOLDER = resolve(TMP_FOLDER, 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}

export { MULTER, UPLOADS_FOLDER, TMP_FOLDER }
