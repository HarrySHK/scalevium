import React from "react";
import { Hotel, HeartPulse, Dumbbell, Truck, MapPin, Layers, Check, Search, ChevronDown, UserPlus, GitCommit } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const INDUSTRIES = [
  { id: "hospitality", Icon: Hotel, industry: "Hospitality", useCase: "experiHAUS, Hotel AI Receptionist" },
  { id: "healthcare", Icon: HeartPulse, industry: "Healthcare", useCase: "Dental AI Scheduling, Therapy AI Intake, Med Spa AI" },
  { id: "fitness", Icon: Dumbbell, industry: "Fitness & Wellness", useCase: "Gym AI Booking, Spa AI Receptionist" },
  { id: "logistics", Icon: Truck, industry: "Logistics & Dispatch", useCase: "FleetQuix, Towcentric" },
  { id: "public-safety", Icon: MapPin, industry: "Public Safety & GIS", useCase: "Earthquickalert" },
  { id: "saas", Icon: Layers, industry: "SaaS & Integrations", useCase: "StackOne" },
];

function IndustryShell({
  item,
  delay,
  children,
}: {
  item: (typeof INDUSTRIES)[number];
  delay: number;
  children: React.ReactNode;
}) {
  const Mark = item.Icon;
  return (
    <ScrollReveal delay={delay}>
      <div className={`pib-card pib-card--${item.id}`}>
        <div className="pib-graphic">
          <div className="pib-scene">{children}</div>
        </div>
        <div className="pib-content">
          <div className="pib-mark" aria-hidden="true">
            <Mark size={16} />
          </div>
          <div className="pib-copy">
            <h3 className="pib-title">{item.industry}</h3>
            <p className="pib-desc">{item.useCase}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function PremiumIndustryGrid() {
  return (
    <div className="premium-industry-grid">
      <IndustryShell item={INDUSTRIES[0]} delay={0}>
        <div className="pib-radar">
          <div className="pib-radar-sweep" aria-hidden="true" />
          <div className="pib-radar-ring r1" />
          <div className="pib-radar-ring r2" />
          <div className="pib-radar-center">
            <Hotel size={22} />
          </div>
        </div>
      </IndustryShell>

      <IndustryShell item={INDUSTRIES[1]} delay={0.08}>
        <div className="pib-mock-dropdown">
          <div className="pib-mock-header">Select Patient Profile</div>
          <div className="pib-mock-item active">@john.doe</div>
          <div className="pib-mock-item">@sara.khan</div>
          <div className="pib-mock-btn">
            <Search size={12} /> Find Records
          </div>
        </div>
      </IndustryShell>

      <IndustryShell item={INDUSTRIES[2]} delay={0.16}>
        <div className="pib-mock-panel">
          <div className="pib-mock-header">
            Class Capacity <ChevronDown size={14} style={{ marginLeft: "auto" }} />
          </div>
          <div className="pib-mock-toggle-row">
            <div className="pib-mock-checkbox checked"><Check size={10} /></div>
            <span>Auto-waitlist enabled</span>
          </div>
          <div className="pib-mock-select">Everyone in Studio can book</div>
          <div className="pib-capacity" aria-hidden="true"><span /></div>
        </div>
      </IndustryShell>

      <IndustryShell item={INDUSTRIES[3]} delay={0.24}>
        <div className="pib-scene-route">
          <svg className="pib-route" viewBox="0 0 240 120" aria-hidden="true">
            <path d="M8 92 C 48 92, 62 28, 108 28 S 168 96, 232 36" />
          </svg>
          <div className="pib-mock-panel pib-darker">
            <div className="pib-mock-input-row">
              <span className="pib-placeholder">Assign driver...</span>
              <span className="pib-badge">Dispatch</span>
            </div>
            <div className="pib-mock-user-row">
              <div className="pib-mock-avatar" />
              <span>alex.d@fleet.com</span>
              <span className="pib-role">Active</span>
            </div>
            <div className="pib-mock-user-row">
              <div className="pib-mock-avatar" />
              <span>sam.t@fleet.com</span>
              <span className="pib-role">En Route</span>
            </div>
          </div>
        </div>
      </IndustryShell>

      <IndustryShell item={INDUSTRIES[4]} delay={0.32}>
        <div className="pib-mock-sidebar-layout">
          <div className="pib-mock-sidebar">
            <div className="pib-mock-s-item"><MapPin size={12} /> Zones</div>
            <div className="pib-mock-s-item active"><UserPlus size={12} /> Teams</div>
          </div>
          <div className="pib-mock-main">
            <div className="pib-mock-card active">
              <div className="pib-mock-avatar square" />
              <div>
                <div className="pib-mock-text-strong">Zone Alpha</div>
                <div className="pib-mock-text-weak">Active Monitoring</div>
              </div>
              <span className="pib-ping" aria-hidden="true" />
            </div>
          </div>
        </div>
      </IndustryShell>

      <IndustryShell item={INDUSTRIES[5]} delay={0.4}>
        <div className="pib-mock-panel">
          <div className="pib-mock-header">
            <GitCommit size={14} /> Sync Webhook <Check size={14} className="pib-success-icon" />
          </div>
          <div className="pib-mock-list">
            <div className="pib-mock-l-item"><Check size={10} className="pib-success-icon" /> Payload validated</div>
            <div className="pib-mock-l-item"><Check size={10} className="pib-success-icon" /> CRM updated</div>
          </div>
          <div className="pib-mock-btn pib-btn-dark">
            <Layers size={12} /> Push to API
          </div>
        </div>
      </IndustryShell>
    </div>
  );
}
