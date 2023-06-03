import { ExerciseGroup } from "src/exercise-groups/entities/exercise-group.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.exercises)
    user: User;

    @ManyToMany(() => ExerciseGroup, exerciseGroup => exerciseGroup.exercises)
    exercise_groups: ExerciseGroup[];
}
