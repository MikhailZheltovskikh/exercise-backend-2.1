const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notePath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await fs.writeFile(notePath, JSON.stringify(notes));
}

async function removeNote(id) {
    const notes = await getNotes();

    const filteredNotes = notes.filter(note => Number(note.id) !== Number(id));

    await fs.writeFile(notePath, JSON.stringify(filteredNotes));
}


async function getNotes() {
    const notes = await fs.readFile(notePath, { encoding: 'utf-8' });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is the list of notes:'));
    notes.forEach((note) => {
        console.log(chalk.blue(note.id), chalk.blue(note.title));
    });
}

module.exports = {
    addNote,
    removeNote,
    printNotes,
};
