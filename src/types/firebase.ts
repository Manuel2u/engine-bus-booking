export interface IUploadFileInput {
  file: Blob | Buffer;
  folderName: string;
  fileName: string;
  mimeType: string;
}
