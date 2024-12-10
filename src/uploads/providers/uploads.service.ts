import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-type.enum';


@Injectable()
export class UploadsService {
    constructor(
        @InjectRepository(Upload) private readonly uploadRepository: Repository<Upload>,
        private readonly configService: ConfigService,
        private readonly uploadToAwsProvider : UploadToAwsProvider
    ){}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported file types
    if (!["image/png", "image/gif", "image/jpeg", "image/jpg"].includes(file.mimetype)){
throw new BadRequestException("mime type not supported");
    }
try {
        // Upload file to AWS S3 bucket)
   const name = await this.uploadToAwsProvider.uploadFile(file);
   // Generate a new record in upload table
const fileUpload :UploadFile = {
   name,
   path: `https://${this.configService.get("appConfig.awsCloudfrontUrl")}/${name}`,
   type: FileTypes.IMAGE,
   mime: file.mimetype,
   size: file.size,
}
   // create an upload
   const upload = this.uploadRepository.create(fileUpload);
   // save the details to database
   console.log(upload);
   return await this.uploadRepository.save(upload);

   
} catch (error) {
    throw new ConflictException(error);
}
  }
}
