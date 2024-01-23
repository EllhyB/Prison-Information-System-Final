import "../loader.css";

const Loader = () => {
  return (
    <div>
      <div className="container">
        <div className="folder">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
        <div className="title">Preparing data files . . .</div>
      </div>
    </div>
  );
};

export default Loader;
