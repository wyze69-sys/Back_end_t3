import { sequelize, Author, Book } from './models/index.js';

async function run() {
  try {
    // Sync database 
    console.log('Synchronizing database...');
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.\n');

    // Q2 - Create sample data
    console.log('--- Q2: Seeding Sample Data ---');

    const ronan = await Author.create({ name: 'Ronan The Best', birthYear: 1990 });
    const kim = await Author.create({ name: 'Kim Ang', birthYear: 1995 });
    const hok = await Author.create({ name: 'Hok Tim', birthYear: 2015 });

    console.log(`Created authors: 
  - ${ronan.name} (born ${ronan.birthYear})
  - ${kim.name} (born ${kim.birthYear})
  - ${hok.name} (born ${hok.birthYear})`);

    // Each author should have at least 2 books
    await Book.bulkCreate([
      { title: 'The Art of Sequelize', publicationYear: 2018, pages: 350, authorId: ronan.id },
      { title: 'Advanced Javascript Guide', publicationYear: 2021, pages: 420, authorId: ronan.id },
      
      { title: 'Database Design Basics', publicationYear: 2020, pages: 280, authorId: kim.id },
      { title: 'Node.js in Action', publicationYear: 2023, pages: 510, authorId: kim.id },
      
      { title: 'Coding for Kids', publicationYear: 2024, pages: 120, authorId: hok.id },
      { title: 'My First Webpage', publicationYear: 2025, pages: 95, authorId: hok.id }
    ]);
    console.log('Sample books successfully created.\n');

    // Q3 - Queries

    console.log('--- Q3: Running Queries ---');

    // Query 1: Fetch all books by a given author 
    console.log('\n1. Fetching all books by author "Ronan The Best":');
    const authorToFetch = await Author.findOne({ where: { name: 'Ronan The Best' } });
    if (authorToFetch) {
      const books = await authorToFetch.getBooks();
      console.log(`Books written by ${authorToFetch.name}:`);
      books.forEach(book => {
        console.log(`  - "${book.title}" (${book.publicationYear}), Pages: ${book.pages}`);
      });
    } else {
      console.log('Author "Ronan The Best" not found.');
    }

    // Query 2: Create a new book for an existing author using createBook()
    console.log('\n2. Creating a new book for "Kim Ang" using createBook() association mixin:');
    const existingAuthor = await Author.findOne({ where: { name: 'Kim Ang' } });
    if (existingAuthor) {
      const newBook = await existingAuthor.createBook({
        title: 'Mastering SQL & NoSQL',
        publicationYear: 2026,
        pages: 310
      });
      console.log(`Successfully created new book "${newBook.title}" (ID: ${newBook.id}) for author "${existingAuthor.name}".`);
    } else {
      console.log('Author "Kim Ang" not found.');
    }

    // Query 3: List all authors along with their books (include)
    console.log('\n3. Listing all authors along with their books (using include):');
    const allAuthors = await Author.findAll({
      include: [{
        model: Book,
        as: 'books'
      }]
    });

    allAuthors.forEach(auth => {
      console.log(`\nAuthor: ${auth.name} (born ${auth.birthYear})`);
      if (auth.books && auth.books.length > 0) {
        auth.books.forEach(b => {
          console.log(`  * Book: "${b.title}" | Published: ${b.publicationYear} | Pages: ${b.pages}`);
        });
      } else {
        console.log('  * No books registered.');
      }
    });

  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
  }
}

run();
