import { Html, useProgress } from "@react-three/drei";

import "./Loader.css";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <p className="pot-loader">{progress.toFixed(2)}%</p>
    </Html>
  );
};

export default Loader;
