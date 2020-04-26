import {IUser} from "../src/app/model/users.model";
import {IPlaceholder} from "../src/app/model/placeholder.model";

interface UserData {
    user: IUser;
    token: string;
}

class Data {
    public userInfo: UserData;
    public placeholderInfo: IPlaceholder;
}

export default new Data();