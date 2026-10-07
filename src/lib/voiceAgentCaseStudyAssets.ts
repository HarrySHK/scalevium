/** Static call-flow diagram HTML (flowchart .dc.html under /public). */
const VOICE_AGENT_FLOWCHART_BY_SLUG: Record<string, string> = {
  "ai-hospitality-receptionist":
    "/Voice Agent Case Studies/Hospitality/Hotel AI Receptionist/Hotel AI Receptionist Flowchart.dc.html",
  "ai-gym-receptionist":
    "/Voice Agent Case Studies/Fitness & Wellness/Gym AI Booking/Gym AI Booking Flowchart.dc.html",
  "ai-spa-receptionist":
    "/Voice Agent Case Studies/Fitness & Wellness/Spa AI Receptionist/Spa AI Receptionist Flowchart.dc.html",
  "ai-therapy-receptionist":
    "/Voice Agent Case Studies/Healthcare/Therapy AI Intake/Therapy AI Intake Flowchart.dc.html",
  "ai-dental-receptionist":
    "/Voice Agent Case Studies/Healthcare/Dental AI Scheduling/Dental AI Scheduling Flowchart.dc.html",
};

/** Public paths to animated call-flow demos (Descript Component HTML under /public). */
const VOICE_AGENT_DEMO_VIDEO_BY_SLUG: Record<string, string> = {
  "ai-hospitality-receptionist":
    "/Voice Agent Case Studies/Hospitality/Hotel AI Receptionist/Hotel AI Receptionist Video.dc.html",
  "ai-gym-receptionist":
    "/Voice Agent Case Studies/Fitness & Wellness/Gym AI Booking/Gym AI Booking Video.dc.html",
  "ai-spa-receptionist":
    "/Voice Agent Case Studies/Fitness & Wellness/Spa AI Receptionist/Spa AI Receptionist Video.dc.html",
  "ai-therapy-receptionist":
    "/Voice Agent Case Studies/Healthcare/Therapy AI Intake/Therapy AI Intake Video.dc.html",
  "ai-dental-receptionist":
    "/Voice Agent Case Studies/Healthcare/Dental AI Scheduling/Dental AI Scheduling Video.dc.html",
};

/** Encode each path segment for use in iframe `src` and links. */
export function publicPathToUrl(publicPath: string): string {
  const trimmed = publicPath.replace(/^\/+/, "");
  if (!trimmed) return "/";
  return `/${trimmed.split("/").map(encodeURIComponent).join("/")}`;
}

export function getVoiceAgentDemoVideoPath(slug: string): string | undefined {
  return VOICE_AGENT_DEMO_VIDEO_BY_SLUG[slug];
}

export function getVoiceAgentFlowchartPath(slug: string): string | undefined {
  return VOICE_AGENT_FLOWCHART_BY_SLUG[slug];
}
