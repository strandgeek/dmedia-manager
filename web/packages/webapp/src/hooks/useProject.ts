import { useEffect, useState } from "react"
import { client } from "src/api/client"
import { Project } from "src/types/project"

interface UseProject {
  project?: Project | null
}

export const useProject = (): UseProject => {
  const [project, setProject] = useState<Project | null>(null)
  useEffect(() => {
    client.get<{ projects: Project[] }>('/projects')
      .then(res => {
        const { projects } = res.data;
        if (projects.length > 0) {
          // TODO: 1 - At this point we need to make sure the projects list from a user has always at least one project
          // TODO: 2 - Add option to change the project
          const project = projects[0];
          setProject(project);
          return
        }
      })
  }, []);
  return {
    project,
  }
}
