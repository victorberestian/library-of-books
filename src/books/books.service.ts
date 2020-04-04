import {
    Injectable,
    BadRequestException,
    UnprocessableEntityException,
    NotFoundException
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {plainToClass} from 'class-transformer';
import {InjectRepository} from '@nestjs/typeorm';
import {Book} from './books.model';
import {validate} from 'class-validator';
import {validateModel} from "../services/validateModels";

/**
 * BooksService
 * Main class services that aggregates CRUD operations on books.
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@Injectable()
export class BooksService {

    /**
     * BooksService constructor.
     *
     * @param bookRepository
     */
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {
    }

    /**
     * Add book method. Will return stored book.
     *
     * @param {Book} body
     *
     * @return {Promise<Book>}
     */
    async create(body: Book): Promise<Book> {
        if (Array.isArray(body)) {
            throw new BadRequestException('Body should not be an array');
        }

        const book = plainToClass(Book, {
            title: body.title,
            iban: body.iban,
            publishedAt: new Date(body.publishedAt),
            authorId: body.authorId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await validateModel(book);

        return await this.bookRepository.save(book);
    }

    async getBook(id: string): Promise<Book> {
        const book = await this.bookRepository.findOne(id);
        if (book === null || book === undefined) {
            throw new NotFoundException(`No book with id '${id}' found`);
        }

        return book;
    }

    async updateBook(id: string, body: Book): Promise<Book> {
        if (Array.isArray(body)) {
            throw new BadRequestException('Body should not be an array');
        }

        const book = await this.getBook(id);

        if (body.title) {
            book.title = body.title;
        }

        if (body.iban) {
            book.title = body.title;
        }

        if (body.publishedAt) {
            book.title = body.title;
        }

        if (body.authorId) {
            book.authorId = body.authorId;
        }

        book.updatedAt = new Date();

        await validateModel(book);
        await this.bookRepository.update(id, book);

        return book;
    }

    async destroy(id: string) {
        await this.getBook(id);
        await this.bookRepository.delete(id);

        return id;
    }
}
