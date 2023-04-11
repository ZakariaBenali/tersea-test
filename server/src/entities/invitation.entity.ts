import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { History } from './history.entity';

export type InvitationStatus = 'confirmed' | 'pending' | 'canceled';

@Entity()
export class Invitation extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({
		type: 'enum',
		enum: ['confirmed', 'pending', 'canceled'],
		default: 'pending',
	})
	status: InvitationStatus;

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

	constructor(name: string, email: string, companyId: string) {
		super();
		this.name = name;
		this.email = email;
		this.companyId = Number(companyId);
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

	@Column()
	companyId: number;

	@ManyToOne(() => Company, (company) => company.invitations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'companyId' })
	company: Company;

	@OneToMany(() => History, (history) => history.user)
	histories: History[];
}
