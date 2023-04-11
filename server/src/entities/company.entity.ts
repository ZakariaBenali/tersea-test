import {
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeUpdate,
	BeforeInsert,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Invitation } from './invitation.entity';

@Entity()
export class Company extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({
		name: 'created_at',
		type: 'timestamp',
	})
	@CreateDateColumn()
	createdAt: Date;

	@Column({
		name: 'updated_at',
		type: 'timestamp',
	})
	@UpdateDateColumn()
	updatedAt: Date;

	constructor(name: string) {
		super();
		this.name = name;
	}

	@BeforeInsert()
	beforeCreate() {
		this.createdAt = new Date();
		this.updatedAt = this.createdAt;
	}

	@BeforeUpdate()
	beforeUpdate() {
		this.updatedAt = new Date();
	}

	@OneToMany(() => User, (user) => user.company)
	users: User[];

	@OneToMany(() => Invitation, (invitation) => invitation.company)
	invitations: Invitation[];
}
