const express = require('express');
const { uuid } = require('uuidv4')
const app = express();
app.use(express.json());

const projects = [];

/**
 *  Query Params: Vamos usar principalmente para filtros e paginação
 *  Route Params: Identificar recursos na hora de atualizar ou deletar
 *  Request Body: Informações que chegam através da requestuisição do usuario
 **/

/*app.get('/', (requestuest, responseponse) => {
    responseponse.send('Olá, Pessoal!');
})

app.listen(3000, () => {
    console.log('Servidor rodando!');
});*/

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    console.log(title);
    console.log(owner);

    const project = { id: uuid(), title, owner };

    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    };

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Proejto não foi encontrado' });
    };

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333);