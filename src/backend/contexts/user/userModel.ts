import { Column, Entity } from '@wwwouter/typed-knex';

@Entity('users')
export class User {
    @Column({ primary: true })
    public id: string;
    @Column()
    public username: string;
    @Column()
    public email_address: string;
    @Column()
    public password: string;
    @Column()
    public last_login_on?: string;
    @Column()
    public created_at?: string;
    @Column()
    public updated_at?: string;
}
