import {Validate, IsDate, IsString} from 'class-validator';
import {Presence} from '../validators/presence.validator';
import {Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

/**
 * Author model.
 * This class describes fields that Author entity contains.
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@Entity()
export class Author {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @Validate(Presence, {
        message: 'First name missing',
    })
    @IsString({
        message: 'First name must be a string',
    })
    @ApiProperty()
    firstName: string;

    @Column()
    @Validate(Presence, {
        message: 'Last name missing',
    })
    @IsString({
        message: 'Last name must be a string',
    })
    @ApiProperty()
    lastName: string;

    @Column()
    @IsDate({
        message: 'Invalid format for author\'s birthday',
    })
    @ApiProperty()
    birthday: Date;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
