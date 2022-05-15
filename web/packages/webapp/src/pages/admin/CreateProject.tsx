import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject } from "src/api/mutations/projects";
import { useProject } from "src/hooks/useProject";

export const CreateProject = () => {
  const { setProject } = useProject()
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const mutation = useMutation(createProject) 
  const onCreateClick = async () => {
    try {
      const { project } = await mutation.mutateAsync({
        name,
      })
      setProject(project)
      navigate('/admin/medias');
    } catch (error) {
      toast.error('Could not create the project');
    }
  }
  return (
    <div className="max-w-5xl mx-auto w-[480px]">
      <h1 className="text-center text-2xl mt-24 text-gray-700">Create Project</h1>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <div className="mt-1">
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. My Blog Medias"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => onCreateClick()}
            disabled={!name || name.length === 0}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};
