import moment from 'moment';
import { UserRepository } from '../contexts/user/UserRepository';
import { BackendErrorCodes } from './BackendErrorCodes';

export async function login(userId: string) {
    const repository = new UserRepository();
    const user = await repository.findOne(userId);

    if (!user.is_active) {
        throw new Error(BackendErrorCodes.ACCOUNT_IS_INACTIVE);
    }

    await repository.updateItem(userId, { last_login_on: moment().toISOString() });

    return user;
}
