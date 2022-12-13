import {IBaseEntity} from "../../base/base.entity";
import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Customer extends IBaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email' })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'city'})
    city: string;

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword(password: string): Promise<void> {
        const salt: string = await bcrypt.genSalt();
        this.password = bcrypt.hashSync(password || this.password, salt);
    }
}
