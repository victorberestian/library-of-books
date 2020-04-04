import {Validate, IsDate, IsString} from 'class-validator';
import {Presence} from './../validators/presence.validator';
import {Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

/**
 * Book model.
 * This class describes fields that Book entity contains.
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@Entity()
export class Book {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @Validate(Presence, {
        message: 'Title is missing',
    })
    @IsString()
    @ApiProperty()
    title: string;

    @Column()
    @Validate(Presence, {
        message: 'Author is missing',
    })
    @ApiProperty()
    authorId: string;

    @Column()
    @Validate(Presence, {
        message: 'IBAN is missing',
    })
    @ApiProperty()
    iban: string;

    @Column()
    @IsDate()
    @ApiProperty()
    publishedAt: Date;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
