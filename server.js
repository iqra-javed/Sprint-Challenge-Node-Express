const express = require('express');
const cors = require('cors');
const server = express();
const port = 6000;


// middleware
server.use(express.json());
server.use(cors());

// sub--applications
const projectsRoutes = require('.routes/projects/projectsRoutes');
// const actionsRoutes = require('.routes/actions/actionsRoutes');

// route handlers
server.use('/api/projects', projectsRoutes);
// server.use('/api/actions', actionsRoutes);

server.listen(port, console.log(`Server is listening on port ${port}`));