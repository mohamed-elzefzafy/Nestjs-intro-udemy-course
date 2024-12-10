import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import {v4 as uuid4} from "uuid";


@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: Express.Multer.File) {
    const s3 = new S3();
try {
    const uploadResult = await s3
    .upload({ 
      Bucket: this.configService.get('appConfig.awsBucketName') ,
      Body : file.buffer,
      Key :  this.generateFileName(file),
      ContentType : file.mimetype,

  })
    .promise();

      // Return the file name
      return uploadResult.Key;
} catch (error) {
    throw new RequestTimeoutException(error);
}
  }

  private  generateFileName(file: Express.Multer.File){
        // extract file name
        const name = file.originalname.split(".")[0]
        // Remove spaces in the file name
        name.replace(/\s/g , "").trim();
        // extract file extension
        const extension = path.extname(file.originalname);
        // Generate a timestamp
        const timestamp = new Date().getTime().toString().trim();
        // Return new fileName
        return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
