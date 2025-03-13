/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const schemaDir = path.join(__dirname, './schemas');
const schemaFiles = fs.readdirSync(schemaDir, { recursive: true });
console.log('schemaFiles', schemaFiles);

let schemaContent = ` 
generator client {
    provider = "prisma-client-js"
    binaryTargets = ["native", "debian-openssl-3.0.x", "rhel-openssl-1.1.x"]
    previewFeatures = ["views"]
}
  
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}  
`;

schemaFiles
    .filter((x) => x.includes('.prisma'))
    .forEach((file) => {
        const filePath = path.join(schemaDir, file);
        console.log('filePath', filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const contendWithoutImports = fileContent.replaceAll(
            /import\s\{(\w+)\}\sfrom\s"(\.\/|\.\.\/)(\w+\/?)+(\w+(\.\w+)?)"/gi,
            '',
        );
        schemaContent += `\n${contendWithoutImports}`;
    });

fs.writeFileSync(path.join(__dirname, './schema.prisma'), schemaContent);
console.log('Schema files merged successfully.');
