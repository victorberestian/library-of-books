import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {Author} from "./authors.model";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

/**
 * AuthorsController
 *
 * @author Victor Berestian <berestianvictor@gmail.com>
 *
 * @version 1.0.0
 */
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
    /**
     * AuthorsController constructor
     *
     * @param authorsService
     */
    constructor(
        private readonly authorsService: AuthorsService,
    ) {
    }

    /**
     * Get list of authors.
     */
    @Get()
    async getAuthors() {
        return await this.authorsService.getAll();
    }

    /**
     * Get Author by Id.
     *
     * @param {String} id
     */
    @Get(':id')
    @ApiOperation({description: 'Find author by Id.'})
    @ApiResponse({
        status: 200,
        description: 'The author has been found created.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    async findAuthor(@Param('id') id: string) {
        return await this.authorsService.findOneAuthor(id);
    }

    /**
     * Create Author
     *
     * @param {Object<Author>} author
     *
     * @return {Author}
     */
    @Post()
    @ApiOperation({description: 'Create author.'})
    @ApiResponse({
        status: 200,
        description: 'The author has been successfully created.',
    })
    @ApiResponse({status: 400, description: 'Bad Request'})
    async addAuthor(@Body() author: Author) {
        return await this.authorsService.create(author);
    }

    /**
     * Update Author.
     *
     * @param {String} id
     * @param {Author} author
     *
     * @return {Author}
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
    async updateAuthor(@Param('id') id: string, @Body() author: Author) {
        return await this.authorsService.changeAuthor(id, author);
    }

    /**
     * Get Author's books by Id.
     *
     * @param {String} id
     *
     * @return {Array<Book>}
     */
    @Get(':id/books')
    @ApiOperation({description: 'Find books by author\'s Id.'})
    @ApiResponse({
        status: 200,
        description: 'Found.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    async getAuthorsBooks(@Param('id') id: string) {
        return await this.authorsService.getBooks(id);
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
    async destroyAuthor(@Param('id') id: string) {
        await this.authorsService.destroy(id);
    }
}
