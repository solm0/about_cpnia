import { Suspense, useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimationMixer, LoopRepeat } from "three";
import { prefersLiteMediaLoad } from "./videoPreload";

const WALK_MODEL_PATH = "/models/animations/walk.glb";

function WalkingCharacter() {
  const walkModel = useGLTF(WALK_MODEL_PATH);
  const scene = useMemo(() => walkModel.scene.clone(), [walkModel.scene]);
  const mixerRef = useRef(null);

  useEffect(() => {
    const mixer = new AnimationMixer(scene);
    const clip = walkModel.animations[0];

    mixerRef.current = mixer;

    if (clip) {
      mixer.clipAction(clip).reset().setLoop(LoopRepeat, Infinity).play();
    }

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene, walkModel.animations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      position={[0, -0.98, 0]}
      rotation={[0, -Math.PI / 4, 0]}
      scale={2.12}
    />
  );
}

export default function InitialLoader() {
  const liteMode = prefersLiteMediaLoad();

  return (
    <div className="initial-loader fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 px-6">
        {liteMode ? (
          <div className="flex h-[16rem] w-full items-center justify-center overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <p className="text-6xl font-logo font-bold tracking-[0.08em] text-zinc-900">CPNIA.</p>
          </div>
        ) : (
          <div className="h-[16rem] w-full overflow-hidden">
            <Canvas camera={{ position: [0, 0.45, 4.8], fov: 28 }}>
              <color attach="background" args={["#ffffff"]} />
              <ambientLight intensity={1.05} />
              <directionalLight position={[4, 6, 5]} intensity={1.55} color="#fff5e8" />
              <directionalLight position={[-5, 2, -4]} intensity={0.52} color="#dbeafe" />
              <hemisphereLight groundColor="#f3f4f6" intensity={0.62} color="#ffffff" />
              <Suspense fallback={null}>
                <WalkingCharacter />
              </Suspense>
            </Canvas>
          </div>
        )}
        <p className="text-2xl tracking-[0.22em] text-zinc-900">Loading...</p>
      </div>
    </div>
  );
}
