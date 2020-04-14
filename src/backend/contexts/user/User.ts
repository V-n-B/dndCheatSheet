import { Column, Entity } from '@wwwouter/typed-knex';

@Entity('users')
export class User {
    @Column({ primary: true })
    public id: string;
    @Column()
    public username: string;
    @Column()
    public email: string;
    @Column()
    public password: string;
    @Column()
    public is_active: boolean;
    @Column()
    public verification_token: string;
    @Column()
    public verification_token_generated_datetime: string;
    @Column()
    public last_login_on?: string;
    @Column()
    public created_at?: string;
    @Column()
    public updated_at?: string;
}
