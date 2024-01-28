class SimpleShell {
    constructor() {
        this.resetFileSystem();
        this.resetTimer = setInterval(() => this.resetFileSystem(), 60000); // Reset every minute
    }

    resetFileSystem() {
        this.fileSystem = {
            '/guest_user': {
                'Welcome_folder': {
                    // Contents of Welcome_folder
                },
                'interesting_documents_folder': {
                    // Contents of interesting_documents_folder
                    'passport.txt': 'Passport details here...',
                    'personal_diary.txt': 'Diary entries...'
                },
                'funny_animals.txt': 'There are many funny animals. Here are a few I believe are worth noting: Squirrels, Dogs, Cats, Rabbits, and many more!'
            }
            // ... other directories and files if any ...
        };
        this.currentDir = '/guest_user';
    }

    ls() {
        const contents = this.fileSystem[this.currentDir];
        if (!contents) return '';
    
        // Include both files and directories in the listing
        return Object.entries(contents).map(([key, value]) => {
            return typeof value === 'string' ? key : key + '/';
        }).join('\n');
    }

    cd(path) {
        const newPath = path === '..' ? '/guest_user' : this.resolvePath(path);
        if (typeof this.getFileContent(newPath) === 'object') {
            this.currentDir = newPath;
            return `Changed directory to ${newPath}`;
        } else {
            return `Directory not found: ${path}`;
        }
    }

    pwd() {
        return this.currentDir;
    }

    cat(filename) {
        const filePath = this.resolvePath(filename);
        const fileContent = this.getFileContent(filePath);
        return fileContent || `File not found: ${filename}`;
    }

    cp(source, destination) {
        const sourcePath = this.resolvePath(source);
        const destPath = this.resolvePath(destination);

        const sourceContent = this.getFileContent(sourcePath);
        if (!sourceContent) {
            return `Source file not found: ${source}`;
        }

        this.setFileContent(destPath, sourceContent);
        return `Copied ${source} to ${destination}`;
    }

    getFileContent(filePath) {
        let currentLevel = this.fileSystem;
        const pathParts = filePath.split('/').filter(p => p);
    
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            if (currentLevel[part] !== undefined) {
                if (i === pathParts.length - 1 && typeof currentLevel[part] === 'string') {
                    return currentLevel[part]; // Return file content
                }
                currentLevel = currentLevel[part];
            } else {
                return null; // Path does not exist
            }
        }
        return null; // Not a file
    }

    setFileContent(filePath, content) {
        let currentLevel = this.fileSystem;
        const pathParts = filePath.split('/').filter(p => p);
        const fileName = pathParts.pop();

        for (const part of pathParts) {
            if (typeof currentLevel[part] === 'object') {
                currentLevel = currentLevel[part];
            } else {
                return null; // Path does not exist
            }
        }

        currentLevel[fileName] = content; // Set or create the file with content
    }

    executeCommand(command) {
        const args = command.split(' ');
        const cmd = args.shift();

        switch (cmd) {
            case 'ls':
                return this.ls();
            case 'cd':
                return this.cd(args[0]);
            case 'pwd':
                return this.pwd();
            case 'cat':
                return this.cat(args[0]);
            case 'cp':
                return this.cp(args[0], args[1]);
            default:
                return 'Unknown command';
        }
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path; // Absolute path
        }
        // Correctly handle relative paths from the current directory
        let fullPath = `${this.currentDir}/${path}`.replace(/\/+/g, '/');
        // Additional logic to handle '..' for parent directory might be needed
        return fullPath;
    }

    destroy() {
        clearInterval(this.resetTimer);
    }
}

// Usage
const shell = new SimpleShell();
console.log(shell.executeCommand('pwd')); // Should print '/guest_user'
console.log(shell.executeCommand('ls'));  // Lists contents of '/guest_user'
console.log(shell.executeCommand('cd Welcome_folder'));
console.log(shell.executeCommand('pwd')); // Should print '/guest_user/Welcome_folder'
console.log(shell.executeCommand('ls')); // Lists contents of '/guest_user/Welcome_folder'
console.log(shell.executeCommand('cd ..'));
console.log(shell.executeCommand('cat funny_animals.txt')); // Should display contents of funny_animals.txt
console.log(shell.executeCommand('cd /guest_user')); // Should work
console.log(shell.executeCommand('cd Welcome_folder')); // Should work if in /guest_user
console.log(shell.executeCommand('cd interesting_documents_folder')); // Should work if in /guest_user
console.log(shell.executeCommand('cat funny_animals.txt')); // Should display file content if in /guest_user