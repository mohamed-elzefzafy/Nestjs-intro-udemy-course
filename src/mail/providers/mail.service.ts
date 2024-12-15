import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ){}

    public async sendUseremail(user : User) {
await this.mailerService.sendMail({
    to : user.email,
    from : "onboarding Team <support@nestjs-blog.com>",
    subject : "Welcome to our blog!",
    template : "./welcome",
    context : {
        name : user.firstName,
        email : user.email,
       loginUrl : "http://localhost:3000",
    }

})
    }
}
