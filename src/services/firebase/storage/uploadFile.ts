import { IAppContext, IService } from "../../../types/app";
import { IUploadFileInput } from "../../../types/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { giveCurrentDateTime } from "../../../utils/time";

export default class FireBaseStorage extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async uploadFile(input: IUploadFileInput): Promise<string> {
    try {
      const storage = getStorage();

      const dateTime = giveCurrentDateTime();

      const storageRef = ref(
        storage,
        `${input.folderName}/${input.fileName}${dateTime}`
      );

      const metadata = {
        contentType: input.mimeType,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        input.file,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (e) {
      throw e;
    }
  }
}
