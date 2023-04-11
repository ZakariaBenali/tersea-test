import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Invitation } from './invitation.entity';

export enum historyAction {
	created = 'created',
	canceled = 'canceled',
	approved = 'approved',
}

@Entity()
export class History extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: ['created', 'canceled', 'approved'],
	})
	action: historyAction;

	constructor(userId: number, invitationId: string, action: historyAction) {
		super();
		this.userId = userId;
		this.invitationId = invitationId;
		this.action = action;
	}

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
	userId: number;

	@ManyToOne(() => User, (user) => user.histories)
	@JoinColumn({ name: 'userId' })
	user: User;

	@Column()
	invitationId: string;

	@ManyToOne(() => Invitation, (invitation) => invitation.histories, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'invitationId' })
	invitation: Invitation;
}
