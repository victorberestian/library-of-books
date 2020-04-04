import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthorsModule} from './authors/authors.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Author} from './authors/authors.model';
import { ConfigModule } from '@nestjs/config';
import {BooksModule} from './books/books.module';
import {Book} from './books/books.model';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            useNewUrlParser: true,
            url: process.env.DATABASE_URL || 'mongodb://localhost:27017/library',
            entities: [
                Author,
                Book,
            ],
            synchronize: true,
        }),
        AuthorsModule,
        BooksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
