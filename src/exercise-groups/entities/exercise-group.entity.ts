import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExerciseGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({nullable: true})
    planned_on_day: number;

    @ManyToOne(() => User, user => user.exercise_groups)
    user: User;
}
