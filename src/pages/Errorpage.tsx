
import { useRouteError } from "react-router-dom";
import "../styling/Errorpage.css";

const Errorpage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string; message?: string }).statusText ||
            (error as { statusText?: string; message?: string }).message}
        </i>
      </p>
    </div>
  );
};

export default Errorpage;
