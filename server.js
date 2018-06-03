const express = require('express');
const cors = require('cors');
const server = express();
const port = 6001;


// middleware
server.use(express.json()); //express.json() is a global middleware
server.use(cors());

// sub--applications
const projectsRoutes = require('./appRoutes/projects/projectsRoutes');
const actionsRoutes = require('./appRoutes/actions/actionsRoutes');

// route handlers
server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

server.listen(port, console.log(`Server is listening on port ${port}`));