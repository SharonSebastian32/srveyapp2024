import "../styles/Progress.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <p>1 out of 8 Questions</p>
    </div>
  );
};

export default ProgressBar;
