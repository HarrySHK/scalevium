import React from "react";
import { Phone, Sparkles, CalendarCheck, Handshake, Check } from "lucide-react";

const CONNECTOR_NODES = [
  { icon: Phone, x: 77, y: 27 },
  { icon: Sparkles, x: 90, y: 44 },
  { icon: CalendarCheck, x: 73, y: 60 },
  { icon: Handshake, x: 86, y: 75 },
];

/** Decorative only: every string here already appears elsewhere on the Home page. */
export default function HomeHeroVisual() {
  return (
    <div className="home-hero-visual" data-hero-visual data-hero-reveal aria-hidden="true">
      <div className="home-hero-visual__stage" data-hero-visual-stage>
        <svg className="home-hero-connector" viewBox="0 0 220 340" fill="none">
          <path
            className="home-hero-connector__track"
            d="M170 92 C 150 112, 196 132, 198 150 S 150 190, 160 204 S 200 240, 190 255 S 165 280, 175 300"
          />
          <path
            className="home-hero-connector__path"
            data-connector-path
            pathLength={1}
            d="M170 92 C 150 112, 196 132, 198 150 S 150 190, 160 204 S 200 240, 190 255 S 165 280, 175 300"
          />
        </svg>

        {CONNECTOR_NODES.map(({ icon: Icon, x, y }, i) => (
          <span
            key={i}
            className="home-hero-node"
            data-connector-node
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon size={13} />
          </span>
        ))}

        <div className="home-float home-float--ghost" data-depth="0.35">
          <div className="home-float-card home-float-card--ghost" data-float-card>
            <div className="home-float-card__head">
              <span className="home-float-card__dot" />
              Integrations — your systems
            </div>
            <div className="home-float-card__chips">
              <span>Calendar</span>
              <span>CRM</span>
              <span>SMS</span>
            </div>
          </div>
        </div>

        <div className="home-float home-float--call" data-depth="0.7">
          <div className="home-float-card" data-float-card>
            <div className="home-float-card__head">
              <span className="home-float-card__dot home-float-card__dot--live" />
              Live call — AI voice agent
            </div>
            <p className="home-float-card__line">
              <strong>AI:</strong> Done. You&apos;re booked for Thursday at 2:30.
            </p>
          </div>
        </div>

        <div className="home-float home-float--stat" data-depth="0.55">
          <div className="home-float-card" data-float-card>
            <div className="home-float-card__metric">
              11<span>Projects shipped</span>
            </div>
            <div className="home-float-card__bar">
              <span style={{ width: "88%" }} />
            </div>
          </div>
        </div>

        <div className="home-float home-float--badge-a" data-depth="0.9">
          <span className="home-float-badge" data-float-badge>+6 AI systems live</span>
        </div>
        <div className="home-float home-float--badge-b" data-depth="1">
          <span className="home-float-badge home-float-badge--success" data-float-badge>
            <Check size={11} /> SMS sent
          </span>
        </div>
        <div className="home-float home-float--badge-c" data-depth="0.8">
          <span className="home-float-badge" data-float-badge>48h</span>
        </div>
      </div>
    </div>
  );
}
