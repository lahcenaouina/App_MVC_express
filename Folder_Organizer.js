const fs = require('fs');
const path = require('path');

const PATH_FOLDER_INPUT = path.join(__dirname , 'Folder');

fs.readdir(PATH_FOLDER_INPUT, (err, files) => {
    if (err) {
        console.error(err.message);
        return;
    }

    const extensions = new Set();

    // Get unique extensions
    files.forEach(file => extensions.add(path.extname(file)));

    console.log('Unique extensions:', extensions);

    // Make folders for each unique extension
    extensions.forEach(ext => {
        if (ext) {
            const folderName = `Folder_${ext.replace('.', '')}`;
            const pathFolder = path.join(__dirname, 'Folder', folderName);

            if (!fs.existsSync(pathFolder)) {
                fs.mkdirSync(pathFolder);
            }

            files.forEach(file => {
                const sourceFile = path.join(PATH_FOLDER_INPUT, file);
                const destinationFile = path.join(pathFolder, file);

                // Only move files with the matching extension
                if (path.extname(file) === ext) {
                    fs.rename(sourceFile, destinationFile, (err) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`Moved ${file} to ${folderName}`);
                        }
                    });
                }
            });
        }
    });
});
