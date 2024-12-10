import { FileTypes } from "../enums/file-type.enum";

export interface UploadFile {
  name: string;
  path: string;
  type: FileTypes;
  mime: string;
  size: number; 
}