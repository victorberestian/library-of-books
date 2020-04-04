import {Module} from '@nestjs/common';
import {AuthorsController} from './authors.controller';
import {AuthorsService} from './authors.service';
import {Author} from './authors.model';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './../books/books.model';

/**
 * AuthorsModule
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@Module({
    imports: [TypeOrmModule.forFeature([Author, Book])],
    controllers: [AuthorsController],
    providers: [AuthorsService],
})
export class AuthorsModule {
}
