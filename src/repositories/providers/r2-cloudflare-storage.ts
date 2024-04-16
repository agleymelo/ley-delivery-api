import { PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync } from 'node:fs'
import { stat, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'

import { TMP_FOLDER } from '../../config/upload'
import { r2 } from '../../lib/cloudflare'
import type { UploadFilesRepository } from '../repository/providers/upload-files-repository'

export class R2CloudflareStorage implements UploadFilesRepository {
  async saveFile(fileName: string): Promise<void> {
    const file = resolve(TMP_FOLDER, fileName)

    const image = readFileSync(file)

    const putObjectCommand = new PutObjectCommand({
      Bucket: 'ley-delivery',
      Key: fileName,
      ContentType: 'image/jpeg',
      Body: image,
    })

    await r2.send(putObjectCommand)

    try {
      await stat(file)
    } catch {
      return
    }

    await unlink(file)
  }

  async deleteFile(fileName: string): Promise<void> {
    const image = new PutObjectCommand({
      Bucket: 'ley-delivery',
      Key: fileName,
    })
    await r2.send(image)
  }
}
