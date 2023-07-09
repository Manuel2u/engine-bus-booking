import { IAppContext, IService } from "../types/app";
import { IUser } from "../types/user";
import generateVerificationCode from "../utils/verification";

export default class Code extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  //send code
  async sendCode(user: any): Promise<string> {
    const code = await generateVerificationCode();
  
    const alreadyGotCode = await this.db.CodeModel.findOne({ user });
  
    if (alreadyGotCode) {
      await this.db.CodeModel.findOneAndUpdate({ user }, { $set: { code } }, { new: true });
    } else {
      const _code = new this.db.CodeModel({
        user: user,
        code: code,
      });
      await _code.save();
    }
  
    const message = `${code} is your AppName verification code.`;
  
    return message || "";
  }

  
}
