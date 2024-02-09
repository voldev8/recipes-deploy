import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Loader from "./Loader";

const Pot = () => {
  const pot = useGLTF("./pot/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight
        position={[5, 5, 5]}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={{ width: 1024, height: 1024 }}
      />
      <directionalLight intensity={0.9} position={[0, 5, 0]} castShadow />
      <primitive
        object={pot.scene}
        scale={1.8}
        position-y={-5}
        receiveShadow
        castShadow
      />
    </mesh>
  );
};

const PotCanvas = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Canvas
      style={{ height: "300px" }}
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 50,
        near: 1,
        far: 100,
        position: [5, 20, 20],
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          onEnd={() => setLoading(false)}
        />
        <Pot />

        {!loading && <Preload all />}
      </Suspense>
    </Canvas>
  );
};

export default PotCanvas;
