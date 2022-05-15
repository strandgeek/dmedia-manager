import React, { createContext, useCallback, useContext, useEffect } from "react"
import { useQuery } from "react-query";
import { getProjects } from "src/api/queries/project";
import { Project } from "src/types/project"


export const ProjectContext = createContext<{
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>
}>({
  setProject: () => null,
  project: null,
})


interface UseProject {
  project?: Project | null
  setProject: (project: Project) => void;
}

export const useProject = (): UseProject => {
  const { project, setProject: _setProject } = useContext(ProjectContext)
  const { refetch } = useQuery("projects", getProjects, {
    enabled: false,
  })

  const setProject = useCallback((project: Project) => {
    _setProject(project);
    localStorage.setItem("currentProject", JSON.stringify(project));
  }, [_setProject])

  useEffect(() => {
    const currentProjectJson = localStorage.getItem("currentProject")
    if (currentProjectJson) {
      _setProject(JSON.parse(currentProjectJson));
    } else {
      // Fallbacking to the first project
      // setProject(projects![0]);
      refetch().then(res => {
        if (res && res.data && res.data.length > 0) {
          setProject(res.data[0])
        }
      })
    }
  }, [_setProject, refetch, setProject]);

  return {
    project,
    setProject,
  }
}
