import fs from 'fs';

const content = 'Hello!';

const filePath = 'example.txt';

fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error(err);
    } 
});