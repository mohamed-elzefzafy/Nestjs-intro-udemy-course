import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider implements HashingProvider {
   public async hashPassword(password: string | Buffer): Promise<string> {
       const salt = await bcrypt.genSalt(10);
       return  bcrypt.hash(password , salt);
    }
    comparePasswords(password: string | Buffer, bcrypted: string): Promise<boolean> {
        return bcrypt.compare(password, bcrypted);
    }
}
