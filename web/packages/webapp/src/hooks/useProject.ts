import { useEffect, useState } from "react"
import { client } from "src/api/client"
import { Project } from "src/types/project"

interface UseProject {
  project?: Project | null
  setProject: (project: Project) => void;
}

export const useProject = (): UseProject => {
  const [project, _setProject] = useState<Project | null>(null);
  useEffect(() => {
    const currentProjectJson = localStorage.getItem("currentProject")
    if (currentProjectJson) {
      _setProject(JSON.parse(currentProjectJson));
    } else {
      // Fallbacking to the first project
      client.get<{ projects: Project[] }>("/projects").then(res => {
        setProject(res.data.projects[0]);
      })
    }
  }, []);

  const setProject = (project: Project) => {
    _setProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));
  }
  
  return {
    project,
    setProject,
  }
}
