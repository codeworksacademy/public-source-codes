import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Project } from "@/models/Project.js"




class ProjectsService {
  async createProject(projectData) {
    const response = await api.post('api/projects', projectData)
    console.log('✨🎨📡', response.data);
    const createdProject = new Project(response.data)
    AppState.profileProjects.unshift(createdProject)
  }

  async getProjectsByProfileId(profileId) {
    AppState.profileProjects = []
    const response = await api.get(`api/projects?creatorId=${profileId}`)
    console.log('🧑‍🦲🎨📡', response.data);
    AppState.profileProjects = response.data.map(projectData => new Project(projectData))
  }

  async getProjectById(projectId) {
    AppState.activeProject = null
    const response = await api.get(`api/projects/${projectId}`)
    console.log('👆🎨📡', response.data);
    AppState.activeProject = new Project(response.data)
  }

  async getAllProjects() {
    const response = await api.get('api/projects')
    console.log('🎨📡', response.data)
    AppState.projects = response.data.map(projectData => new Project(projectData))
  }

}

export const projectsService = new ProjectsService()
