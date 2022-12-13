import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class IBaseEntity {
    @PrimaryGeneratedColumn()
    id: number | string;

    @Column({ name: 'created_at', default: Date.now() })
    createAt: number;

    @UpdateDateColumn({
        name: 'updated_at',
        default: Date.now(),
        type: 'timestamp',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: number;
}
