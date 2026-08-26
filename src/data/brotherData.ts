export interface DriverMetric {
  name: string;
  value: number;
  max: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface ArchiveImage {
  src: string;
  title: string;
  annotation: string;
  rotation: string; // Tailwind rotation class e.g. 'rotate-2'
  size: string; // Tailwind grid span or size classes
}

export interface TeamMember {
  name: string;
  role: string;
  driverNumber: string;
}

export interface TelemetryCard {
  number: string;
  title: string;
  description: string;
}

export interface BrotherData {
  brotherName: string;
  brotherInitials: string;
  birthYear: number;
  age: number;
  season: string;
  driverClass: string;
  currentStatus: string;
  metrics: DriverMetric[];
  timeline: TimelineEvent[];
  archive: ArchiveImage[];
  teamGrid: TeamMember[];
  twentyOneThings: TelemetryCard[];
  futureMission: {
    year: string;
    headline: string;
    missionText: string;
  };
  finalMessage: {
    headline: string;
    subheadline: string;
    message: string;
    signoff: string;
  };
}

export const brotherData: BrotherData = {
  brotherName: "VIDURA",
  brotherInitials: "VD",
  birthYear: 2005,
  age: 21,
  season: "SEASON 21",
  driverClass: "LEGEND",
  currentStatus: "FULL SEND",
  metrics: [
    { name: "SPEED", value: 98, max: 100 },
    { name: "STYLE", value: 92, max: 100 },
    { name: "CHAOS", value: 100, max: 100 },
    { name: "VIBES", value: 100, max: 100 },
  ],
  timeline: [
    {
      year: "01",
      title: "STARTING GRID",
      description: "The beginning. Est. 2005. Engine turned on. The green lights are lit.",
      image: "/images/timeline_1.png",
    },
    {
      year: "05",
      title: "FIRST LAPS",
      description: "Childhood memories. Speeding through sandbox tracks and exploring the backyard paddock.",
      image: "/images/timeline_2.png",
    },
    {
      year: "10",
      title: "NEW CIRCUIT",
      description: "Adapting to school circuits. Learning the racing lines, finding new teammates.",
      image: "/images/timeline_3.png",
    },
    {
      year: "15",
      title: "FULL THROTTLE",
      description: "Teenage speed runs. Discovering music, late-night studies, and high-octane friendships.",
      image: "/images/timeline_4.png",
    },
    {
      year: "18",
      title: "DEBUT SEASON",
      description: "Entering adulthood. License to race obtained. Navigating and adult track days.",
      image: "/images/timeline_5.png",
    },
    {
      year: "21",
      title: "CURRENT POSITION",
      description: "P1 on the starting grid. The next season starts. Driver is primed and ready. Full send.",
      image: "/images/timeline_6.png",
    },
  ],
  archive: [
    {
      src: "/images/portrait.jpeg",
      title: "THE COVER PORTRAIT",
      annotation: "BIRTHDAY COVER ISSUE / 2026",
      rotation: "-rotate-2",
      size: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
    },
    {
      src: "/images/placeholder_1.png",
      title: "THE GOOD DAYS",
      annotation: "NO BRAKES / PIT LANE STORIES",
      rotation: "rotate-3",
      size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    },
    {
      src: "/images/placeholder_2.png",
      title: "PIT LANE DIARIES",
      annotation: "MIDNIGHT GARAGE RUNS",
      rotation: "-rotate-1",
      size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    },
    {
      src: "/images/placeholder_3.png",
      title: "UNREPEATABLE LAP",
      annotation: "SUMMER SESSION '25",
      rotation: "rotate-6",
      size: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
    },
    {
      src: "/images/placeholder_4.png",
      title: "CLASSIFIED MEMORIES",
      annotation: "OFF-TRACK ESCAPADES",
      rotation: "-rotate-3",
      size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    },
  ],
  teamGrid: [
    { name: "AMMA", role: "TEAM PRINCIPAL", driverNumber: "#01" },
    { name: "APPACHCHI", role: "CHIEF EXECUTIVE OFFICER", driverNumber: "#02" },
    { name: "NANGI", role: "AERO DYNAMICS MANAGER", driverNumber: "#07" },
    { name: "AYYA (ME)", role: "CHIEF STRATEGIST", driverNumber: "#21" },
  ],
  twentyOneThings: [
    { number: "01", title: "THE LAUGH", description: "Loud enough to clear out the pitlane and wake up the whole team." },
    { number: "02", title: "THE ATTITUDE", description: "P1 mental attitude. Unbothered by traffic, always hunting the apex." },
    { number: "03", title: "THE CHAOS", description: "No strategy meetings can predict his next wild move. 100% unpredictable." },
    { number: "04", title: "THE LOYALTY", description: "Never leaves a teammate stranded in a gravel trap. Ride or die." },
    { number: "05", title: "THE LATE NIGHTS", description: "Burning fuel at 3 AM. Midnight conversations and code adjustments." },
    { number: "06", title: "THE AMBITION", description: "Aiming for the championship title, never satisfied with just finishing." },
    { number: "07", title: "THE RANDOM IDEAS", description: "Starts a project at midnight and completes it by the morning warm-up." },
    { number: "08", title: "THE STYLE", description: "Vogue-ready paddock walk. Luxury sunglasses even under garage lights." },
    { number: "09", title: "THE CONFIDENCE", description: "No brakes mindset. If you don't go for a gap, you're no longer a racer." },
    { number: "10", title: "THE DRIVE", description: "Relentless work ethic. Push-push-push, lap after lap." },
    { number: "11", title: "THE MADNESS", description: "Doing things purely for the plot and the memories." },
    { number: "12", title: "THE PLAYLISTS", description: "Underground street beats mixed with high-tempo racing bass." },
    { number: "13", title: "THE FOCUS", description: "When the visor goes down, the world fades. Absolute concentration." },
    { number: "14", title: "THE INSIDE JOKES", description: "Encrypting memories that only the crew can decode." },
    { number: "15", title: "THE COFFEE RUNS", description: "High-octane fuel stops. Espresso double shots only." },
    { number: "16", title: "THE RESILIENCE", description: "Bouncing back from a crash. DNF is never an option for long." },
    { number: "17", title: "THE COMRADERY", description: "Unmatched vibes in the team garage, keeping morale at 100%." },
    { number: "18", title: "THE OVERTHINKING", description: "Analyzing telemetry data at 4 AM to optimize the next lap." },
    { number: "19", title: "THE HUSTLE", description: "Always building, coding, creating. Continuous engine updates." },
    { number: "20", title: "THE BIG DREAMS", description: "Designing circuits for the future. Broad and limitless vision." },
    { number: "21", title: "THE LEGACY", description: "Chapter 21 is just the start. The best laps are yet to come." },
  ],
  futureMission: {
    year: "2026 → NEXT CHAPTER",
    headline: "THE BEST LAPS ARE STILL AHEAD.",
    missionText: "MISSION: MAKE IT COUNT.",
  },
  finalMessage: {
    headline: "HAPPY 21ST.",
    subheadline: "THE RACE IS JUST BEGINNING.",
    message: "To my bro here's to another year of crazy memories, big dreams, unexpected turns and full-throttle living. Keep pushing. Keep laughing. Keep becoming the person you're meant to be. And whatever happens... NEVER HIT THE BRAKES.",
    signoff: "— Your Brother",
  },
};
