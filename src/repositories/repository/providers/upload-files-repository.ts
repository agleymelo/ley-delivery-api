export interface UploadFilesRepository {
  saveFile(fileName: string): Promise<void>
  deleteFile(fileName: string): Promise<void>
}
