import {Book} from './books.model';
import {validate} from 'class-validator';
import {ObjectID} from 'typeorm';
import {Types} from 'mongoose';

describe('Book', () => {
    let book: Book;

    beforeEach(async () => {
        book = new Book();
    });

    it('should have authorId present', async (done) => {
        book.title = 'Test title';
        book.iban = 'test_iban';
        book.publishedAt = new Date('1998-01-03');

        const errors = await validate(book);
        expect(errors[0].constraints.presence).toBe('Author is missing')
        return done();
    })

    it('should have title present', async (done) => {
        book.authorId = '5d523698f3176c29bc8dbfc6';
        book.iban = 'test_iban';
        book.publishedAt = new Date('1998-01-03');

        const errors = await validate(book);

        expect(errors[0].constraints.presence).toBe('Title is missing')
        return done();
    });

    it('should have iban', async (done) => {
        book.authorId = '5d523698f3176c29bc8dbfc6';
        book.title = 'Test title';
        book.publishedAt = new Date('1998-01-03');

        const errors = await validate(book);

        expect(errors[0].constraints.presence).toBe('IBAN is missing');
        return done();
    })

    it('should have publishedAt', async (done) => {
        book.authorId = '5d523698f3176c29bc8dbfc6';
        book.title = 'Test title';
        book.iban = 'test_iban';
        book.publishedAt = null;

        const errors = await validate(book);

        expect(errors[0].constraints.isDate).toBe('publishedAt must be a Date instance')

        return done()
    });
});
