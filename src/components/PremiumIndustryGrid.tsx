import React from "react";
import { Hotel, HeartPulse, Dumbbell, Truck, MapPin, Layers, Check, Search, ChevronDown, UserPlus, GitCommit } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const INDUSTRIES = [
  { id: "hospitality", icon: <Hotel size={24} />, industry: "Hospitality", useCase: "experiHAUS, Hotel AI Receptionist" },
  { id: "healthcare", icon: <HeartPulse size={24} />, industry: "Healthcare", useCase: "Dental AI Scheduling, Therapy AI Intake, Med Spa AI" },
  { id: "fitness", icon: <Dumbbell size={24} />, industry: "Fitness & Wellness", useCase: "Gym AI Booking, Spa AI Receptionist" },
  { id: "logistics", icon: <Truck size={24} />, industry: "Logistics & Dispatch", useCase: "FleetQuix, Towcentric" },
  { id: "public-safety", icon: <MapPin size={24} />, industry: "Public Safety & GIS", useCase: "Earthquickalert" },
  { id: "saas", icon: <Layers size={24} />, industry: "SaaS & Integrations", useCase: "StackOne" },
];

export default function PremiumIndustryGrid() {
  return (
    <div className="premium-industry-grid">
      {/* 1. Hospitality (Top Left) - Radar/Concentric */}
      <ScrollReveal delay={0}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-radar">
              <div className="pib-radar-ring r1"></div>
              <div className="pib-radar-ring r2"></div>
              <div className="pib-radar-center">
                {INDUSTRIES[0].icon}
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[0].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[0].useCase}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Healthcare (Top Middle) - Dropdown/List */}
      <ScrollReveal delay={0.1}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-mock-dropdown">
              <div className="pib-mock-header">Select Patient Profile</div>
              <div className="pib-mock-item active">@john.doe</div>
              <div className="pib-mock-item">@sara.khan</div>
              <div className="pib-mock-btn">
                <Search size={12} /> Find Records
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[1].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[1].useCase}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Fitness (Top Right) - Permissions/Toggles */}
      <ScrollReveal delay={0.2}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-mock-panel">
              <div className="pib-mock-header">Class Capacity <ChevronDown size={14} style={{marginLeft: "auto"}}/></div>
              <div className="pib-mock-toggle-row">
                <div className="pib-mock-checkbox checked"><Check size={10} /></div>
                <span>Auto-waitlist enabled</span>
              </div>
              <div className="pib-mock-select">
                Everyone in Studio can book
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[2].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[2].useCase}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Logistics (Bottom Left) - Invite/Assign */}
      <ScrollReveal delay={0.3}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-mock-panel pib-darker">
              <div className="pib-mock-input-row">
                <span className="pib-placeholder">Assign driver...</span>
                <span className="pib-badge">Dispatch</span>
              </div>
              <div className="pib-mock-user-row">
                <div className="pib-mock-avatar"></div>
                <span>alex.d@fleet.com</span>
                <span className="pib-role">Active</span>
              </div>
              <div className="pib-mock-user-row">
                <div className="pib-mock-avatar"></div>
                <span>sam.t@fleet.com</span>
                <span className="pib-role">En Route</span>
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[3].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[3].useCase}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Public Safety (Bottom Middle) - Workspace/Map UI */}
      <ScrollReveal delay={0.4}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-mock-sidebar-layout">
              <div className="pib-mock-sidebar">
                <div className="pib-mock-s-item"><MapPin size={12}/> Zones</div>
                <div className="pib-mock-s-item active"><UserPlus size={12}/> Teams</div>
              </div>
              <div className="pib-mock-main">
                <div className="pib-mock-card active">
                  <div className="pib-mock-avatar square"></div>
                  <div>
                    <div className="pib-mock-text-strong">Zone Alpha</div>
                    <div className="pib-mock-text-weak">Active Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[4].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[4].useCase}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* 6. SaaS (Bottom Right) - Sync/Version UI */}
      <ScrollReveal delay={0.5}>
        <div className="pib-card">
          <div className="pib-graphic">
            <div className="pib-mock-panel">
              <div className="pib-mock-header"><GitCommit size={14}/> Sync Webhook <Check size={14} className="pib-success-icon"/></div>
              <div className="pib-mock-list">
                <div className="pib-mock-l-item"><Check size={10} className="pib-success-icon"/> Payload validated</div>
                <div className="pib-mock-l-item"><Check size={10} className="pib-success-icon"/> CRM updated</div>
              </div>
              <div className="pib-mock-btn pib-btn-dark">
                <Layers size={12} /> Push to API
              </div>
            </div>
          </div>
          <div className="pib-content">
            <h3 className="pib-title">{INDUSTRIES[5].industry}</h3>
            <p className="pib-desc">{INDUSTRIES[5].useCase}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
