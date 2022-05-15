import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { getProjects } from "src/api/queries/project"
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
    }
  }, [project]);

  const setProject = (project: Project) => {
    localStorage.setItem("currentProject", JSON.stringify(project));
    _setProject(project);
  }
  
  
  const navigate = useNavigate()
  const { data: projects, isLoading } = useQuery("projects", getProjects)
  if (isLoading) {
    return {
      project: null,
      setProject,
    }
  }
  if (projects && projects.length > 0) {
    return {
      project: project || projects[0],
      setProject,
    }
  } else {
    navigate('/admin/create-project');
  }
  return {
    project: null,
    setProject,
  }
}
