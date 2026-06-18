import "@fontsource/jersey-15";
import "@fontsource/vt323";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import BehindCarousel from "./components/BehindCarousel";
import HeroVideoShuffle from "./components/HeroVideoShuffle";
import ImageMarquee from "./components/ImageMarquee";
import LazyVideo from "./components/LazyVideo";
import RevealSection from "./components/RevealSection";
import ScrambleButton from "./components/ScrambleButton";
import ImageMarquee2 from "./components/ImageMarquee2";
import ImageMarquee3 from "./components/ImageMarquee3";
import { warmVideoCache } from "./components/videoPreload";
import { ALL_VIDEO_SOURCES } from "./components/videoSources";

const CitizenShowcase = lazy(() => import("./components/CitizenShowcase"));

const heroParagraphs = [
  "국민대학교 시각디자인학과 기획전 ‘Through X’에서 A팀은 전시 주제인 ‘현실과 허구의 교차'를 해석한 인터랙티브 웹 프로젝트 C.PNIA를 선보였습니다. 전시 기간 동안 방문객들은 세 개의 국가로 구성된 오픈 월드를 탐험하며 각 사회를 대표하는 AI NPC와 상호작용하고, 대화를 통해 세계관과 사회 구조를 점차 이해해 나갔습니다.",
  "플레이어는 월드 곳곳에 숨겨진 세 개의 퀘스트를 수행하며 각 사회에 점차 동화되고, 모든 여정을 마치면 해당 국가의 시민권을 획득하게 됩니다. AI NPC는 플레이어의 입력에 따라 성격과 대화 방식이 변화하며, 같은 세계라도 사람마다 다른 경험을 만들어 냅니다.",
  "전시는 2025년 11월 6일부터 15일까지 진행되었으며, 관람객들은 게임과 함께 다양한 캐릭터 굿즈를 구매하며 프로젝트를 경험했습니다."
];

const worlds = [
  {
    name: "On Time",
    video: "/movies/ontime.mov",
    description:
      "On Time의 시민들은 정해진 시간을 수명으로 가지고 태어나며, 시간을 화폐로 사용합니다. 대부분의 시민은 시간을 들여 일하는 대신 카지노에서 도박으로 시간을 증식합니다.",
  },
  {
    name: "Pizza Shoot",
    video: "/movies/pizzashoot.mov",
    description:
      "Pizza Shoot에는 공동체를 위해 자신을 피자의 재료로 바치는 오랜 전통 의식이 있습니다. 시민들은 이를 Pizza Shoot 국민으로서의 자부심이자 인생의 목표로 여깁니다.",
  },
  {
    name: "Entropy",
    video: "/movies/entropy.mov",
    description:
      "Entropy는 원래 무질서를 사랑하는 곳이었으나, 억압으로 모든 엔트로피가 '큐브' 안에 갇혀 시민들은 단조로운 삶을 살고 있습니다. 시민들은 '큐브'를 파괴하고 엔트로피를 탈환하기를 원합니다.",
  },
];

const heroGradientConfig = {
  colors: ["#09619b", "#3d59c0", "#d0b9b9"],
  transparentStop: "72%",
  whiteStop: "100%",
  originX: "50%",
  originY: "-18%",
  ellipseWidth: "148%",
  ellipseHeight: "118%",
};

function Logo() {
  return (
    <div className="h-[50vh] md:h-[calc(100vh-20rem)] animate-logoCycle flex flex-wrap items-center justify-center gap-2 leading-none text-zinc-900 text-[5rem] md:text-[7rem]">
      <span className="letter font-logo font-bold">C</span>
      <span className="letter font-logo font-bold">P</span>
      <span className="letter font-logo font-bold">N</span>
      <span className="letter font-matrix">I</span>
      <span className="letter font-matrix">A</span>
      <span className="letter font-logo font-bold">.</span>
    </div>
  );
}

function CopyBlock({ children }) {
  return (
    <div className="flex flex-col gap-7 text-sm md:text-base leading-7 break-keep sm:pl-14 lg:pl-[40%] md:break-keep max-w-[35em] lg:max-w-max">
      {children}
    </div>
  );
}

function FullBleed({ children, className = "" }) {
  return <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`}>{children}</div>;
}

export default function App() {
  const heroVideoRef = useRef(null);
  const [heroGradientOpacity, setHeroGradientOpacity] = useState(1);

  useEffect(() => {
    warmVideoCache(ALL_VIDEO_SOURCES);
  }, []);

  useEffect(() => {
    const updateGradient = () => {
      const heroNode = heroVideoRef.current;
      if (!heroNode) return;

      const { top, height } = heroNode.getBoundingClientRect();
      const targetTop = window.innerHeight * 0.5 - height * 0.5;
      const distance = Math.max(top - targetTop, 0);
      const range = Math.max(window.innerHeight * 0.65, 1);
      const progress = Math.min(distance / range, 1);

      setHeroGradientOpacity(progress);
    };

    updateGradient();
    window.addEventListener("scroll", updateGradient, { passive: true });
    window.addEventListener("resize", updateGradient);

    return () => {
      window.removeEventListener("scroll", updateGradient);
      window.removeEventListener("resize", updateGradient);
    };
  }, []);

  const heroGradient = `
    radial-gradient(
      ellipse ${heroGradientConfig.ellipseWidth} ${heroGradientConfig.ellipseHeight}
      at ${heroGradientConfig.originX} ${heroGradientConfig.originY},
      ${heroGradientConfig.colors[0]} 0%,
      ${heroGradientConfig.colors[1]} 34%,
      ${heroGradientConfig.colors[2]} 58%,
      rgba(255, 255, 255, 0) ${heroGradientConfig.transparentStop},
      #ffffff ${heroGradientConfig.whiteStop}
    )
  `;

  return (
    <main
      className="relative min-h-screen scroll-smooth bg-white text-zinc-900"
      style={{
        "--hero-gradient": heroGradient,
      }}
    >
      <div
        className="hero-gradient pointer-events-none fixed inset-x-0 top-0 z-0 h-[90vh]"
        style={{ opacity: heroGradientOpacity }}
      />
      <div className="flex justify-center">
        <div className="relative z-10 w-full max-w-7xl px-4 pt-8 md:px-7 md:pt-10">
          <div className="flex flex-col gap-16 md:gap-24">
            <RevealSection className="flex flex-col gap-8 md:gap-21">
              <Logo />
              <div
                ref={heroVideoRef}
                className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden lg:left-auto lg:w-full lg:translate-x-0 lg:rounded-2xl"
              >
                <HeroVideoShuffle />
              </div>
              <div className="flex flex-col gap-7 md:gap-10">
                <h1 className="text-3xl md:text-6xl max-w-[20ch] leading-[1.3em] break-keep">
                  AI NPC와 함께 탐험하는 세 개의 가상 세계
                </h1>
                <p className="text-zinc-500 break-keep max-w-[35em] leading-8 md:leading-9 text-lg md:text-xl">C.PNIA는 인간과 AI의 합작으로 만들어진 세 개의 가상 사회를 탐험하는 인터랙티브 웹 경험입니다. 플레이어는 입력에 따라 성격과 말투가 변화하는 AI NPC와 대화하며, 인공적인 상상력이 만들어낸 사회와 문화를 직접 경험하게 됩니다.</p>
                <CopyBlock>
                  {heroParagraphs.map((paragraph, i) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ScrambleButton text=">_ VISIT CPNIA" href="https://cpnia.vercel.app/" />
                </CopyBlock>
              </div>
            </RevealSection>

            <RevealSection>
              <FullBleed className="md:px-32">
                <LazyVideo
                  src="/movies/1_entry.mp4"
                  className="mx-auto w-full max-w-7xl md:py-6"
                  loop
                />
              </FullBleed>
            </RevealSection>

            <RevealSection className="flex flex-col gap-8">
              <h2 className="text-5xl md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Citizens</h2>
              <CopyBlock>
                <p>일반 NPC들은 맵의 곳곳에 배치되어 각 국가에서 일어나는 대표적 사회 현상들을 보여줍니다.</p>
              </CopyBlock>
              <Suspense
                fallback={
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
                    <div className="aspect-square animate-pulse rounded-2xl" />
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                      {Array.from({ length: 8 }, (_, index) => (
                        <div
                          key={index}
                          className="aspect-square animate-pulse rounded-2xl"
                        />
                      ))}
                    </div>
                  </div>
                }
              >
                <CitizenShowcase />
              </Suspense>
            </RevealSection>

            <RevealSection>
              <FullBleed className="md:px-32">
                <p className="text-3xl pl-4 pb-4 md:p-0">Interview</p>
                <LazyVideo
                  src="/movies/2_interview.mp4"
                  className="mx-auto w-full max-w-7xl md:py-6"
                  loop
                />
              </FullBleed>
            </RevealSection>

            <RevealSection className="flex flex-col gap-5">
              <CopyBlock>
                <p><span className="font-black">Step 1.</span> 각 국가 입장 시 플레이어에게 두 개의 질문에 대한 답변을 요청합니다.</p>
                <p><span className="font-bold">Step 2.</span> 문장에서 formality, verbosity, warmth의 레벨(1-3)을 도출합니다. 총 27가지 조합의 npc 성격이 존재합니다.</p>
                <div className="pl-7">
                  <p>formality: 하십시오체 / 해요체 / 해체</p>
                  <p>verbosity: 단답 / 평범 / 투머치토커</p>
                  <p>warmth: 친근한 / 중립적인 / 적대적인</p>
                </div>
                <p><span className="font-bold">Step 3.</span> 성격이 저장되고, 이후의 npc 대사들이 이에 따라 달라집니다.</p>
              </CopyBlock>
            </RevealSection>

            <RevealSection>
              <FullBleed>
                <ImageMarquee />
              </FullBleed>
            </RevealSection>

            <RevealSection className="flex flex-col gap-7">
              <h2 className="text-5xl md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Chat NPC</h2>
              <CopyBlock>
                <p>
                  각 세계의 시민들의 생각을 대변하는 Chat NPC들은 플레이어를 따라다니며
                  세계관에 대한 어떤 질문이든지 답변해줍니다.
                </p>
              </CopyBlock>
            </RevealSection>

            <RevealSection>
              <FullBleed className="">
                <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 md:px-21">
                  {["/movies/story_1.mp4", "/movies/story_2.mp4", "/movies/story_3.mp4"].map((src) => (
                    <LazyVideo
                      key={src}
                      src={src}
                      className="min-w-[18rem] flex-1 overflow-hidden rounded-3xl"
                      loop
                    />
                  ))}
                </div>
              </FullBleed>
            </RevealSection>
            <RevealSection className="flex flex-col gap-8">
              <h2 className="text-5xl md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Worlds</h2>
              <div className="flex flex-col gap-7">
                {worlds.map((world) => (
                  <div key={world.name} className="flex flex-col md:flex-row">
                    <div className="shrink-0 flex-3 flex justify-center items-center mb-7 md:mb-0">
                      <LazyVideo
                        src={world.video}
                        className="overflow-hidden rounded-3xl w-2/3 bg-zinc-200"
                        loop
                      />
                    </div>
                    <div className="shrink-0 flex-6 flex flex-col justify-center gap-4">
                      <p className="text-2xl">{world.name}</p>
                      <p className="text-sm md:text-base leading-7 break-keep max-w-[35em]">{world.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection className="flex flex-col gap-8 pb-10">
              <FullBleed>
                <ImageMarquee2 />
              </FullBleed>
            </RevealSection>

            <RevealSection className="flex flex-col gap-7 pb-10">
              <h2 className="text-4xl max-w-[20ch] leading-[1.3em] break-keep">제작 과정</h2>
              <BehindCarousel />
            </RevealSection>

            <RevealSection className="flex flex-col gap-8 pb-10">
              <h2 className="text-4xl max-w-[20ch] leading-[1.3em] break-keep">전시/굿즈</h2>
                
               <FullBleed className="flex flex-col md:gap-8">
                <div className="flex flex-col md:flex-row gap-7 items-center md:py-7 bg-zinc-950 md:bg-white max-w-210 mx-auto">
                  <div className="flex-5 shrink-0">
                    <img src="/dp_all.jpg" className="rounded-none md:rounded-3xl" />
                  </div>
                  <div className="flex-6 shrink-0 px-7 md:p-0 -translate-y-32 md:translate-0 z-30">
                    <img src="/poster_1.png" className="object-contain border border-zinc-900/30"/>
                  </div>
                </div>
                <LazyVideo
                  src="/movies/play.mp4"
                  className="mx-auto w-full max-w-210 md:py-6"
                  loop
                />
                <ImageMarquee3 />
               </FullBleed>
            </RevealSection>

            <FullBleed className="mt-21 pb-30 px-4">
              <CopyBlock>
                <ScrambleButton text=">_ VISIT CPNIA" href="https://cpnia.vercel.app/" />
                <p className="opacity-50">제18회 조형전 시각디자인학과 기획전 A팀</p>
                <p className="text-lg">백채민, 오서연, 정솔미, 남진영, 배경진, 안정원, 한예원</p>
                <a href="https://www.instagram.com/kmuvcd_exhibition/" className="text-lg underline underline-offset-4 hover:opacity-50">@kmuvcd_exhibition</a>
              </CopyBlock>
            </FullBleed>
          </div>
        </div>
      </div>
    </main>
  );
}
