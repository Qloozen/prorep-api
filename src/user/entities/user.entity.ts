import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    gender: "male" | "female" | "other";

    @Column()
    birthday: Date;

    @Column()
    current_weight_kg: number;

    @Column()
    height_cm: number;

    @Column()
    email: string;

    @Column()
    provider_UID: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_created: Date;
}
