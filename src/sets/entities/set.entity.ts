import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  repetitions: number;

  @Column()
  weight_kg: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date;

  @ManyToOne(() => User, (user) => user.sets)
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.sets)
  exercise: Exercise;
}
