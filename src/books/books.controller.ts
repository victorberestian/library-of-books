import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {BooksService} from './books.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Book} from "./books.model";

/**
 * BooksController
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }

    /**
     * Find Book by Id.
     *
     * @param {String} id
     */
    @Get(':id')
    @ApiOperation({description: 'Find book by Id.'})
    @ApiResponse({
        status: 200,
        description: 'The book has been found created.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    async getBook(@Param('id') id: string) {
        return await this.booksService.getBook(id);
    }

    /**
     * Create Author
     *
     * @param {Object<Book>} body
     *
     * @return {Author}
     */
    @Post()
    @ApiOperation({description: 'Create book.'})
    @ApiResponse({
        status: 200,
        description: 'The book has been successfully created.',
    })
    @ApiResponse({status: 400, description: 'Bad Request'})
    async addBook(@Body() body: Book) {
        return await this.booksService.create(body);
    }

    /**
     * Update Book.
     *
     * @param {String} id
     * @param {Book} body
     *
     * @return {Book}
     */
    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Updated.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    async updateBook(@Param('id') id: string, @Body() body: Book) {
        return await this.booksService.updateBook(id, body);
    }

    /**
     * Remove Author by Id.
     *
     * @param id
     */
    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deleted.',
    })
    async deleteBook(@Param('id') id: string) {
        await this.booksService.destroy(id);
    }
}
