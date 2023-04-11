import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Company } from './company.entity';
import { History } from './history.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({
		select: false,
	})
	password: string;

	@Column({
		default: false,
	})
	isAdmin: boolean;

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

	constructor(name: string, email: string, password: string, isAdmin = false, companyId?: number) {
		super();
		this.name = name;
		this.email = email;
		this.isAdmin = isAdmin;
		this.password = password;
		if (companyId) {
			this.companyId = companyId;
		}
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

	@BeforeInsert()
	async setPassword() {
		await this.hashPassword();
	}

	@Column({
		nullable: true,
	})
	companyId: number;

	@ManyToOne(() => Company, (company) => company.users, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'companyId' })
	company: Company;

	async hashPassword() {
		this.password = await hash(this.password, Number(process.env.BCRYPT_ROUNDS));
	}

	@OneToMany(() => History, (history) => history.user)
	histories: History[];
}
