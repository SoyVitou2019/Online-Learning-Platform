// BackButton.js
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBack}
      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded"
    >
      <i className="bi bi-arrow-left"></i>
    </button>
  );
};

export default BackButton;
