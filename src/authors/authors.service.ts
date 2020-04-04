import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {Author} from './authors.model';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {validate} from 'class-validator';
import {Book} from '../books/books.model';
import {ApiResponse} from "@nestjs/swagger";
import {validateModel} from "../services/validateModels";


/**
 * AuthorsService
 * Main class services that aggregates CRUD operations on authors.
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@Injectable()
export class AuthorsService {
    /**
     * AuthorsService constructor.
     *
     * @param authorRepository
     * @param bookRepository
     */
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {
    }

    /**
     * Get list of authors.
     *
     * @return {Array<Author>}
     */
    @ApiResponse({
        status: 200,
        description: 'Success.',
    })
    async getAll(): Promise<Author[]> {
        return await this.authorRepository.find();
    }

    /**
     * Return books assigned to author by it's ID.
     *
     * @param {String} id
     *
     * @return {Array<Book>}
     */
    async getBooks(id: string) {
        const author = await this.findOneAuthor(id);

        return await this.bookRepository.find({
            authorId: author.id.toHexString()
        });
    }

    /**
     * Return author by ID.
     *
     * @param {String} id
     *
     * @return {Promise<Author>}
     *
     * @throws {NotFoundException}
     */
    async findOneAuthor(id: string): Promise<Author> {
        const author = await this.authorRepository.findOne(id);
        if (author === null || author === undefined) {
            throw new NotFoundException(`No author with id '${id}' found`);
        }

        return author;
    }

    /**
     * Create author.
     *
     * @param body
     *
     * @return {Promise<Author>}
     *
     * @throws {BadRequestException}
     */
    async create(body: Author): Promise<Author> {
        if (Array.isArray(body)) {
            throw new BadRequestException('Body should not be an array');
        }

        const author = plainToClass(Author, {
            firstName: body.firstName,
            lastName: body.lastName,
            birthday: new Date(body.birthday),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await validateModel(author);

        return await this.authorRepository.save(author);
    }

    /**
     *
     * @param {String} id
     * @param          body
     *
     * @return {Promise<Author>}
     */
    async changeAuthor(id: string, body): Promise<Author> {
        const author = await this.findOneAuthor(id);

        if (body.firstName !== undefined) {
            author.firstName = body.firstName;
        }

        if (body.lastName !== undefined) {
            author.lastName = body.lastName;
        }

        if (body.birthday !== undefined) {
            author.birthday = new Date(body.birthday);
        }

        author.updatedAt = new Date();

        await validateModel(author);

        await this.authorRepository.update(id, author);

        return author;
    }

    /**
     * Delete author by ID. Method in case of success will return ID of Author that was deleted.
     *
     * @param {String} id
     *
     * @return {String}
     */
    async destroy(id: string): Promise<string> {
        await this.findOneAuthor(id);
        await this.authorRepository.delete(id);

        return id;
    }
}
