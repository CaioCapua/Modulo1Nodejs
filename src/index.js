const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid Project ID' });
    }

    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId)

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
        return response.status(400).json({ error: 'Project not found' });
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectsIndex] = project;

    return response.json(project);
 
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectsIndex = projects.findIndex(project => project.id === id);

    if ( projectsIndex === -1 ) {
        return response.status(400).json({ error: 'Project not found' });
    }

    projects.splice(projectsIndex, 1);

    return response.status(200).send();
});

app.listen(3333, () => {
    console.log('Server Started');
});