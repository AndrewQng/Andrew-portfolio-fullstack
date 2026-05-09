const { createContainer, asClass, InjectionMode } = require('awilix');

const AuthController = require('../presentation/controllers/AuthController');
const AdminProfileController = require('../presentation/controllers/AdminProfileController');
const LoginAdmin = require('../application/use-cases/auth/LoginAdmin');
const RefreshAccessToken = require('../application/use-cases/auth/RefreshAccessToken');
const ProjectController = require('../presentation/controllers/ProjectController');
const SkillController = require('../presentation/controllers/SkillController');
const CertificationController = require('../presentation/controllers/CertificationController');

const UserRepository = require('../infrastructure/repositories/user/UserRepository');
const ProjectRepository = require('../infrastructure/repositories/project/ProjectRepository');
const SkillRepository = require('../infrastructure/repositories/skill/SkillRepository');
const CertificationRepository = require('../infrastructure/repositories/certification/CertificationRepository');

const GetUserById = require('../application/use-cases/user/GetUserById');
const UpdateUser = require('../application/use-cases/user/UpdateUser');
const GetPublicProfile = require('../application/use-cases/user/GetPublicProfile');
const UserController = require('../presentation/controllers/UserController');

const GetAllProjects = require('../application/use-cases/project/GetAllProjects');
const GetProjectById = require('../application/use-cases/project/GetProjectById');
const CreateProject = require('../application/use-cases/project/CreateProject');
const UpdateProject = require('../application/use-cases/project/UpdateProject');
const DeleteProject = require('../application/use-cases/project/DeleteProject');

const GetAllSkills = require('../application/use-cases/skill/GetAllSkills');
const GetSkillById = require('../application/use-cases/skill/GetSkillById');
const CreateSkill = require('../application/use-cases/skill/CreateSkill');
const UpdateSkill = require('../application/use-cases/skill/UpdateSkill');
const DeleteSkill = require('../application/use-cases/skill/DeleteSkill');

const GetAllCertifications = require('../application/use-cases/certification/GetAllCertifications');
const GetCertificationById = require('../application/use-cases/certification/GetCertificationById');
const CreateCertification = require('../application/use-cases/certification/CreateCertification');
const UpdateCertification = require('../application/use-cases/certification/UpdateCertification');
const DeleteCertification = require('../application/use-cases/certification/DeleteCertification');

const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

container.register({
    authController: asClass(AuthController).singleton(),
    loginAdmin: asClass(LoginAdmin).singleton(),
    refreshAccessToken: asClass(RefreshAccessToken).singleton(),
    adminProfileController: asClass(AdminProfileController).singleton(),
    getUserById: asClass(GetUserById).singleton(),
    updateUser: asClass(UpdateUser).singleton(),
    getPublicProfile: asClass(GetPublicProfile).singleton(),
    userController: asClass(UserController).singleton(),
    userRepository: asClass(UserRepository).singleton(),

    projectController: asClass(ProjectController).singleton(),
    getAllProjects: asClass(GetAllProjects).singleton(),
    getProjectById: asClass(GetProjectById).singleton(),
    createProject: asClass(CreateProject).singleton(),
    updateProject: asClass(UpdateProject).singleton(),
    deleteProject: asClass(DeleteProject).singleton(),
    projectRepository: asClass(ProjectRepository).singleton(),

    skillController: asClass(SkillController).singleton(),
    getAllSkills: asClass(GetAllSkills).singleton(),
    getSkillById: asClass(GetSkillById).singleton(),
    createSkill: asClass(CreateSkill).singleton(),
    updateSkill: asClass(UpdateSkill).singleton(),
    deleteSkill: asClass(DeleteSkill).singleton(),
    skillRepository: asClass(SkillRepository).singleton(),

    certificationController: asClass(CertificationController).singleton(),
    getAllCertifications: asClass(GetAllCertifications).singleton(),
    getCertificationById: asClass(GetCertificationById).singleton(),
    createCertification: asClass(CreateCertification).singleton(),
    updateCertification: asClass(UpdateCertification).singleton(),
    deleteCertification: asClass(DeleteCertification).singleton(),
    certificationRepository: asClass(CertificationRepository).singleton()
});

module.exports = container;
