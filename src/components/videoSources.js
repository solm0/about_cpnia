export const HERO_SHUFFLE_FILES = [
  "3_ontime_stair.mp4",
  "4_ontime_poker.mp4",
  "5_ontime_slot.mov",
  "6_ontime_slotstage.mov",
  "7_ontime_roulette.mov",
  "8_pizzashoot_npc.mp4",
  "9_pizzashoot_shot.mp4",
  "10_pizzashoot_pizza.mp4",
  "11_pizzashoot_pizzacutter.mp4",
  "12_pizzashoot_seek.mp4",
  "13_entropy_break.mp4",
  "13_entropy_stage2.mp4",
  "14_entropy.mp4",
  "15_entropy_stage3.mp4",
  "16_entropy_run.mov",
];

export const HERO_SHUFFLE_SOURCES = HERO_SHUFFLE_FILES.map(
  (file) => `/movies/${file}`,
);

export const ALL_VIDEO_SOURCES = [
  ...HERO_SHUFFLE_SOURCES,
  "/movies/1_entry.mp4",
  "/movies/2_interview.mp4",
  "/movies/story_1.mp4",
  "/movies/story_2.mp4",
  "/movies/story_3.mp4",
  "/movies/ontime.mov",
  "/movies/pizzashoot.mov",
  "/movies/entropy.mov",
  "/movies/play.mp4",
];
