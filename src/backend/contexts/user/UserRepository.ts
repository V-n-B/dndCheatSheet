import { TypedKnex } from '@wwwouter/typed-knex';
import moment from 'moment';
import { withTypedKnex } from '../../utils/withTypedKnex';
import { User } from './userModel';

@withTypedKnex
export class UserRepository {
    protected typedKnex: TypedKnex;

    public async insertItem(user: User) {
        console.log('user we got inside repository: ', JSON.stringify(user));
        const now = moment().toISOString();
        if (!user.created_at) {
            user.created_at = now;
        }
        if (!user.updated_at) {
            user.updated_at = now;
        }

        const transaction = await this.typedKnex.beginTransaction();
        try {
            await this.typedKnex
                .query(User)
                .transacting(transaction)
                .insertItem(user);
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw new Error(`Failed to insert item: ${e}`);
        }
    }

    public async findOne(id: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.id, id)
            .select(i => [i.id, i.username, i.email_address, i.password]);

        return await query.getSingle();
    }

    public async findOneByEmail(email: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.email_address, email)
            .select(i => [i.id]);

        return await query.getSingleOrNull();
    }
}
