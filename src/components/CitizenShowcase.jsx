import { OrbitControls, Html, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimationMixer, LoopRepeat } from "three";

const ANIMATION_FILES = [
  { id: "idle", path: "/models/animations/idle.glb" },
  { id: "walk", path: "/models/animations/walk.glb" },
  { id: "jump", path: "/models/animations/jump.glb" },
  { id: "arm", path: "/models/animations/arm.glb" },
];

const MODEL_OPTIONS = [
  "default",
  "redPap",
  "gandalf",
  "yellowPap",
  "cheese",
  "olive",
  "cherry",
  "onion",
  "time-npc",
  "dango",
  "lime",
  "entropy-npc",
  "mushroom",
  "pepperoni",
].map((name) => ({
  name,
  image: `/npcprofile/${name}.png`,
  model: ["/models", `${name}${name === "onion" ? ".glb" : ".gltf"}`].join("/"),
}));

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="rounded-full bg-white/80 px-4 py-2 text-sm text-zinc-700 backdrop-blur">
        {Math.floor(progress)}% loaded
      </div>
    </Html>
  );
}

function Character({ modelPath, animationIndex }) {
  const gltf = useGLTF(modelPath);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const actionRef = useRef(null);
  const mixerRef = useRef(null);
  const animations = ANIMATION_FILES.map(({ path }) => useGLTF(path));

  useEffect(() => {
    mixerRef.current = new AnimationMixer(scene);

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene]);

  useEffect(() => {
    if (!mixerRef.current) return;

    const clip = animations[animationIndex].animations[0];
    actionRef.current?.fadeOut(0.2);

    const nextAction = mixerRef.current.clipAction(clip);
    nextAction.reset().fadeIn(0.2).setLoop(LoopRepeat, Infinity).play();
    actionRef.current = nextAction;
  }, [animationIndex, animations]);

  useFrame((_, delta) => mixerRef.current?.update(delta));

  return <primitive object={scene} position={[0, -0.85, 0]} scale={2.35} />;
}

export default function CitizenShowcase() {
  const [modelPath, setModelPath] = useState(MODEL_OPTIONS[0].model);
  const [animationIndex, setAnimationIndex] = useState(0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="shrink-0 aspect-square overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-hidden rounded-2xl bg-zinc-200">
            <Canvas camera={{ position: [0, 0.9, 3], fov: 48 }}>
              <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[8, 6, 6]} intensity={1.2} />
                <directionalLight position={[-8, 4, -2]} intensity={0.6} />
                <Character modelPath={modelPath} animationIndex={animationIndex} />
                <OrbitControls enablePan={false} enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {ANIMATION_FILES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnimationIndex(index)}
                className={`border-2 px-3 py-1.5 text-sm uppercase tracking-[0.2em] transition ${
                  animationIndex === index
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 grid gap-1 grid-cols-4">
        {MODEL_OPTIONS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setModelPath(item.model)}
            className={`overflow-hidden rounded-2xl transition ${
              modelPath === item.model
                ? ""
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="aspect-square h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
