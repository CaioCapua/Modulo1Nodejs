const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = {
        id: uuid(),
        title,
        owner,
    }

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectsIndex = projects.findIndex(project => project.id === id);

    if( projectsIndex === -1 ) {
        response.json({ error: 'Invalid Prject ID' });
    }

    const project = {
        id,
        title,
        owner,
    }

    projects.push(project);

    return response.json(project);
 
});

app.delete('/projects/2', (request, response) => {
    return response.json([
        'Projeto4',
        'Projeto3',
    ]);
});

app.listen(3333, () => {
    console.log('Server Started');
});