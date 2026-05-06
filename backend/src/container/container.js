const { createContainer, asClass, asValue, InjectionMode } = require('awilix');
const ProjectController = require('../presentation/controllers/ProjectController');
const GetAllProjects = require('../application/use-cases/GetAllProjects');
const ProjectRepository = require('../infrastructure/repositories/ProjectRepository');
const db = require('../infrastructure/database/mongoConnection');

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
  // Presentation Layer
  projectController: asClass(ProjectController).singleton(),
  
  // Application Layer (Use Cases)
  getAllProjects: asClass(GetAllProjects).singleton(),
  
  // Infrastructure Layer
  projectRepository: asClass(ProjectRepository).singleton(),
  db: asValue(db)
});

module.exports = container;