import { Exercise } from "src/exercises/entities/exercise.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Exercise, exercise => exercise.exercise_groups, { eager: true })
    @JoinTable({
        name: "ExerciseGroups_Exercises",
        joinColumn: {
            name: "exercise_group_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "exercise_id",
            referencedColumnName: "id"
        }
    })
    exercises: Exercise[];
}
