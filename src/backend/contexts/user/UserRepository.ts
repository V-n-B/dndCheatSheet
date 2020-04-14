import { TypedKnex } from '@wwwouter/typed-knex';
import moment from 'moment';
import { withTypedKnex } from '../../utils/withTypedKnex';
import { User } from './User';

@withTypedKnex
export class UserRepository {
    protected typedKnex: TypedKnex;

    public async insertItem(user: User) {
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

    public async updateItem(id: string, user: Partial<User>) {
        if (!user.updated_at) {
            const now = moment().toISOString();
            user.updated_at = now;
        }

        const transaction = await this.typedKnex.beginTransaction();
        try {
            await this.typedKnex
                .query(User)
                .transacting(transaction)
                .updateItemByPrimaryKey(id, user);
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw new Error(`Failed to update item: ${e}`);
        }
    }

    public async findOne(id: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.id, id)
            .select(i => [i.id, i.username, i.email, i.is_active]);

        return await query.getSingle();
    }

    public async findOneByEmail(email: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.email, email)
            .select(i => [i.id]);

        return await query.getSingleOrNull();
    }

    public async findOneByUsername(username: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.username, username)
            .select(i => [i.id, i.is_active, i.password]);

        return await query.getSingleOrNull();
    }

    public async findOneByVerificationToken(token: string) {
        const query = this.typedKnex
            .query(User)
            .where(i => i.verification_token, token)
            .select(i => [i.id, i.verification_token_generated_datetime, i.last_login_on, i.is_active, i.email, i.username]);

        return await query.getSingleOrNull();
    }
}
