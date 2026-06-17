import "@fontsource/jersey-15";
import "@fontsource/vt323";
import { Suspense, lazy } from "react";
import BehindCarousel from "./components/BehindCarousel";
import HeroVideoShuffle from "./components/HeroVideoShuffle";
import ImageMarquee from "./components/ImageMarquee";
import LazyVideo from "./components/LazyVideo";
import ScrambleButton from "./components/ScrambleButton";

const CitizenShowcase = lazy(() => import("./components/CitizenShowcase"));

const heroParagraphs = [
  "C.PNIA는 인간과 AI의 합작으로 만들어진 세 개의 가상 사회를 탐험하는 인터랙티브 웹 경험입니다. 플레이어는 입력에 따라 성격과 말투가 변화하는 AI NPC와 대화하며, 인공적인 상상력이 만들어낸 사회와 문화를 직접 경험하게 됩니다.",
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

function Logo() {
  return (
    <div className="h-[calc(100vh-20rem)] animate-logoCycle flex flex-wrap items-center justify-center gap-2 text-[6rem] leading-none text-zinc-900 sm:text-[7rem] md:text-[10rem]">
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
    <div className="flex flex-col gap-7 text-lg leading-8 break-keep sm:pl-14 lg:pl-[40%] md:break-keep max-w-[35em] lg:max-w-max">
      {children}
    </div>
  );
}

function FullBleed({ children, className = "" }) {
  return <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`}>{children}</div>;
}

export default function App() {
  return (
    <main className="min-h-screen scroll-smooth bg-[#f8f7f4] text-zinc-900">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-4 py-8 md:px-7 md:py-10">
          <div className="flex flex-col gap-16 md:gap-24">
            <section className="flex flex-col gap-8 md:gap-21">
              <Logo />
              <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden lg:left-auto lg:w-full lg:translate-x-0 lg:rounded-2xl">
                <HeroVideoShuffle />
              </div>
              <div className="flex flex-col gap-7 md:gap-14">
                <h1 className="text-5xl font-semibold md:text-6xl max-w-[20ch] leading-[1.3em] break-keep">
                  AI NPC와 함께 탐험하는 세 개의 가상 세계
                </h1>
                <CopyBlock>
                  {heroParagraphs.map((paragraph, i) => (
                    <p key={paragraph} className={i==0 && 'font-bold text-blue-500'}>{paragraph}</p>
                  ))}
                </CopyBlock>
              </div>
            </section>

            <section>
              <FullBleed className="md:px-32">
                <LazyVideo
                  src="/movies/1_entry.mp4"
                  className="mx-auto w-full max-w-7xl md:py-6"
                  loop
                />
              </FullBleed>
            </section>

            <section className="flex justify-center">
              <ScrambleButton text="VISIT CPNIA" href="https://cpnia.vercel.app/" />
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="text-5xl font-semibold md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Citizens</h2>
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
            </section>

            <section>
              <FullBleed className="md:px-32">
                <p className="text-3xl">Interview</p>
                <LazyVideo
                  src="/movies/2_interview.mp4"
                  className="mx-auto w-full max-w-7xl md:py-6"
                  loop
                />
              </FullBleed>
            </section>

            <section className="flex flex-col gap-5">
              <CopyBlock>
                <p><span className="font-bold text-blue-500">Step 1.</span> 각 국가 입장 시 '입국심사'라는 명분으로 플레이어에게 텍스트 2개를 입력받습니다.</p>
                <p><span className="font-bold text-blue-500">Step 2.</span> 문장에서 formality, verbosity, warmth의 레벨(1-3)을 도출합니다. 총 27가지 조합의 npc 성격이 존재합니다.</p>
                <div className="pl-14">
                  <p>formality: 하십시오체 / 해요체 / 해체</p>
                  <p>verbosity: 단답 / 평범 / 투머치토커</p>
                  <p>warmth: 친근한 / 중립적인 / 적대적인</p>
                </div>
                <p><span className="font-bold text-blue-500">Step 3.</span> 성격이 저장되고, 이후의 npc 대사들이 이에 따라 달라집니다.</p>
              </CopyBlock>
            </section>

            <section>
              <FullBleed>
                <ImageMarquee />
              </FullBleed>
            </section>

            <section className="flex flex-col gap-7">
              <h2 className="text-5xl font-semibold md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Chat NPC</h2>
              <CopyBlock>
                <p>
                  각 세계의 시민들의 생각을 대변하는 Chat NPC들은 플레이어를 따라다니며
                  세계관에 대한 어떤 질문이든지 답변해줍니다.
                </p>
              </CopyBlock>
            </section>

            <section>
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
            </section>

            <section className="text-base text-zinc-600">
              <p>
                <a
                  href="https://www.notion.so/missing-greenelephant/ai-284fe61aac5b804abea1fa7f72a0fe1b"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-6"
                >
                  노션 페이지
                </a>
                에서 자세한 프롬프트와 기록을 확인하실 수 있습니다.
              </p>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="text-5xl font-semibold md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Worlds</h2>
              <div className="flex flex-col gap-7">
                {worlds.map((world) => (
                  <div key={world.name} className="flex flex-col md:flex-row">
                    <div className="shrink-0 flex-3 flex justify-center items-center mb-7 md:mb-0">
                      <LazyVideo
                        src={world.video}
                        className="overflow-hidden rounded-xl w-2/3"
                        loop
                      />
                    </div>
                    <div className="shrink-0 flex-6 flex flex-col justify-center gap-4">
                      <p className="text-3xl">{world.name}</p>
                      <p className="text-lg leading-8 break-keep max-w-[35em]">{world.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8 pb-10">
              <h2 className="text-5xl font-semibold md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Behind the scenes</h2>
              <BehindCarousel />
            </section>

            <section className="flex flex-col gap-8 pb-10">
              <h2 className="text-5xl font-semibold md:text-7xl max-w-[20ch] leading-[1.3em] break-keep">Installation Views</h2>
              <p className="h-[80vh]">준비 중입니다.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
