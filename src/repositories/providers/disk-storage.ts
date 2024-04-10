import { rename, stat, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { UploadFilesRepository } from '../repository/providers/upload-files-repository'
import { TMP_FOLDER, UPLOADS_FOLDER } from '../../config/upload'

export class DiskStorage implements UploadFilesRepository {
  async saveFile(file: string): Promise<void> {
    await rename(resolve(TMP_FOLDER, file), resolve(UPLOADS_FOLDER, file))
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = resolve(UPLOADS_FOLDER, file)

    try {
      await stat(filePath)
    } catch {
      return
    }

    await unlink(filePath)
  }
}
