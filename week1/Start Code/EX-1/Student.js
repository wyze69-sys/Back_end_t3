import fs from 'fs/promises';

const filePath = "./hello.txt";

async function manageFile() {
    try {
        // Write to a file asynchronously
        await fs.writeFile(filePath, "Hello, Node.js beginner!", "utf8");
        
        // Read the file asynchronously
        const content = await fs.readFile(filePath, "utf8");
        console.log("File content:", content);
    } catch (error) {
        console.error("Error handling file:", error);
    }
}

manageFile();