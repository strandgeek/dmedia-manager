import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminIndex = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin/medias');
  }, [navigate])
  return null;
};
