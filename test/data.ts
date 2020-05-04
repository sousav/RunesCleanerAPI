import { IPlaceholder } from "../src/app/model/placeholder.model";
import { IUser } from "../src/app/model/users.model";

interface UserData {
    token: string;
    user: IUser;
}

class Data {
    public placeholderInfo: IPlaceholder;
    public userInfo: UserData;
}

export default new Data();
