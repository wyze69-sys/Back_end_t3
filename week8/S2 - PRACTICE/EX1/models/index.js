import sequelize from '../database.js';
import Author from './Author.js';
import Book from './Book.js';

// An author can write many books, but a book is written by one author.
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

export { sequelize, Author, Book };
