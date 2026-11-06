const VINK = '#0B0E14', VBODY = '#4B5565', VBLUE = '#2563EB', VBLUE_D = '#1D4ED8', VTINT = '#EEF2FF', VLINE = 'rgba(11,14,20,.14)';
const VFONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const VGRID = { backgroundImage: 'linear-gradient(rgba(37,99,235,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.06) 1px,transparent 1px)', backgroundSize: '40px 40px' };
const VM = {
  enter: (T, s, d) => Easing.easeOutCubic(clamp((T - s) / d, 0, 1)),
  glide: (T, s, d) => Easing.easeInOutCubic(clamp((T - s) / d, 0, 1)),
  pop: (T, s, d) => Easing.easeOutBack(clamp((T - s) / d, 0, 1)),
};
const vlerp = (a, b, u) => a + (b - a) * u;
const NH = 140;

const NODES = {
  taxdome: { x: 80, y: 230, w: 360, k: 'Source', t: 'TaxDome', s: 'Pipelines, stages, notes, IRS notices' },
  session: { x: 520, y: 230, w: 360, k: 'Browser', t: 'Signed-in session', s: 'One tab on the firm’s own login' },
  snapshot: { x: 960, y: 230, w: 380, k: 'Reads', t: 'ARIA snapshot', s: 'Page structure, not brittle selectors', kind: 'ink' },
  knowledge: { x: 1420, y: 230, w: 420, k: 'Knowledge', t: 'Training library', s: 'Navigation learned from firm videos', kind: 'kb' },
  pipeline: { x: 520, y: 520, w: 360, k: 'Captures', t: 'Client pipeline', s: 'Current stage and file status' },
  notices: { x: 960, y: 520, w: 380, k: 'Captures', t: 'Notes and notices', s: 'IRS notices on the live file' },
  draft: { x: 1420, y: 520, w: 420, k: 'Prepares', t: 'Proposed update', s: 'Held until someone approves it', kind: 'gate' },
  agents: { x: 520, y: 800, w: 360, k: 'Hands to', t: 'Four-agent system', s: 'Intake, research, notices, filing' },
  telegram: { x: 960, y: 800, w: 380, k: 'Approval', t: 'Telegram gate', s: 'A person approves every write', kind: 'gate' },
  writeback: { x: 1420, y: 800, w: 420, k: 'Writes back', t: 'Approved write', s: 'Only the change that was approved', kind: 'blue' },
  log: { x: 960, y: 1060, w: 380, k: 'Record', t: 'Run log', s: 'What was read, held, and written', kind: 'blue' },
};

const EDGES = {
  e1: [[440, 300], [518, 300]],
  e2: [[880, 300], [958, 300]],
  eK: [[1340, 300], [1418, 300]],
  eP: [[1150, 370], [1150, 440], [700, 440], [700, 518]],
  eN: [[1150, 370], [1150, 518]],
  eD: [[1150, 370], [1150, 440], [1630, 440], [1630, 518]],
  eA: [[700, 660], [700, 798]],
  eT: [[1150, 660], [1150, 798]],
  eW: [[1630, 660], [1630, 798]],
  eL1: [[700, 940], [700, 1130], [958, 1130]],
  eL2: [[1150, 940], [1150, 1058]],
  eL3: [[1630, 940], [1630, 1130], [1342, 1130]],
};

const READ_ROWS = [
  ['Client file', 'Review', 'Note captured'],
  ['IRS notice', 'Intake', 'Context attached'],
  ['Stage update', 'Hold', 'Not written yet'],
];

const GUARDRAILS = [
  ['No public API', 'The browser drives the firm’s signed-in TaxDome workspace.'],
  ['Approval before every write', 'Telegram must approve before anything is saved.'],
  ['One session', 'Human-like timing, one tab, and one persisted login.'],
];

const INTEGRATIONS = ['Playwright', 'OpenClaw', 'ARIA snapshots', 'Telegram', 'TaxDome'];

const LOG_ROWS = [
  ['9:14 AM', 'Client file', 'Read'],
  ['9:16 AM', 'IRS notice', 'Attached'],
  ['9:18 AM', 'Stage update', 'Approved'],
];

function vRounded(p, r = 14) {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const [x0, y0] = p[i - 1], [x1, y1] = p[i], [x2, y2] = p[i + 1];
    const d1 = Math.hypot(x1 - x0, y1 - y0), d2 = Math.hypot(x2 - x1, y2 - y1), rr = Math.min(r, d1 / 2, d2 / 2);
    d += ` L${x1 - (x1 - x0) / d1 * rr} ${y1 - (y1 - y0) / d1 * rr} Q${x1} ${y1} ${x1 + (x2 - x1) / d2 * rr} ${y1 + (y2 - y1) / d2 * rr}`;
  }
  const l = p[p.length - 1];
  return d + ` L${l[0]} ${l[1]}`;
}
function vPoint(p, u) {
  const segs = []; let tot = 0;
  for (let i = 1; i < p.length; i++) { const L = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); segs.push(L); tot += L; }
  let t = clamp(u, 0, 1) * tot;
  for (let i = 0; i < segs.length; i++) {
    if (t <= segs[i] || i === segs.length - 1) { const f = segs[i] ? Math.min(1, t / segs[i]) : 0; return [vlerp(p[i][0], p[i + 1][0], f), vlerp(p[i][1], p[i + 1][1], f)]; }
    t -= segs[i];
  }
}
const vWin = (T, a, b) => Math.min(VM.enter(T, a, 0.35), 1 - VM.enter(T, b, 0.45));
const vAct = (T, ws) => (ws || []).reduce((m, w) => Math.max(m, vWin(T, w[0], w[1])), 0);

function VCheck({ size = 14, color = '#fff' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}
function VChip({ text, p, blue, dark }) {
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', top: -15, right: 16, height: 30, boxSizing: 'border-box', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 999, whiteSpace: 'nowrap',
      background: blue ? VBLUE : dark ? VINK : '#fff', color: blue || dark ? '#fff' : VINK, border: blue || dark ? 'none' : `1px solid ${VLINE}`,
      font: `600 14px ${VFONT}`, opacity: clamp(p * 2, 0, 1), transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: 'right center' }}>{text}</div>
  );
}
function VNode({ n, r, act, ghost, chip }) {
  const k = n.kind;
  const bg = k === 'ink' ? VINK : k === 'blue' ? VBLUE : k === 'gate' ? VTINT : '#fff';
  const border = k === 'gate' ? `2px solid ${VBLUE}` : k === 'kb' ? '1px solid rgba(37,99,235,.45)' : (k === 'ink' || k === 'blue') ? `1px solid ${bg}` : `1px solid ${VLINE}`;
  const kc = k === 'ink' ? '#8FB0FF' : k === 'blue' ? '#DCE6FF' : k === 'gate' ? VBLUE_D : VBLUE;
  const tc = (k === 'ink' || k === 'blue') ? '#fff' : VINK;
  const sc = k === 'ink' ? '#B4BCCB' : k === 'blue' ? '#E6EDFF' : VBODY;
  const o = clamp(r * 1.6, 0, 1);
  return (
    <div style={{ position: 'absolute', left: n.x, top: n.y, width: n.w, height: NH }}>
      {ghost && o < 1 && (
        <div style={{ position: 'absolute', inset: 0, boxSizing: 'border-box', padding: '18px 20px', borderRadius: 10, border: '1.5px dashed rgba(11,14,20,.18)', background: 'rgba(255,255,255,.6)', opacity: 1 - o, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 16 }}></div>
          <div style={{ font: `700 22px/1.2 ${VFONT}`, color: 'rgba(11,14,20,.26)' }}>{n.t}</div>
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, boxSizing: 'border-box', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 10, background: bg, border, opacity: o, transform: `scale(${0.9 + 0.1 * r})`,
        boxShadow: `0 0 0 ${10 * act}px rgba(37,99,235,${0.16 * act}), 0 12px 30px -16px rgba(11,14,20,${k === 'ink' ? 0.5 : 0.25})` }}>
        <div style={{ font: `700 12px ${VFONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: kc }}>{n.k}</div>
        <div style={{ font: `700 22px/1.2 ${VFONT}`, color: tc }}>{n.t}</div>
        <div style={{ font: `400 16px/1.35 ${VFONT}`, color: sc }}>{n.s}</div>
        {chip}
      </div>
    </div>
  );
}
function VEdge({ pts, p, ghost, blue, both }) {
  const d = vRounded(pts), id = blue ? 'tvb' : 'tvk';
  return (
    <g>
      {ghost && <path d={d} stroke="rgba(11,14,20,.10)" strokeWidth="2" fill="none" />}
      {p > 0 && <path d={d} stroke={blue ? VBLUE : VINK} strokeWidth="2" fill="none" strokeDasharray={blue ? '7 6' : undefined} pathLength={blue ? undefined : 1}
        style={blue ? { opacity: p } : { strokeDasharray: '1 1', strokeDashoffset: 1 - p }}
        markerEnd={p > 0.97 ? `url(#${id})` : undefined} markerStart={both && p > 0.97 ? `url(#${id})` : undefined} />}
    </g>
  );
}
function VPill({ x, y, text, p, blue }) {
  if (p <= 0) return null;
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * p})`, opacity: clamp(p * 2, 0, 1), whiteSpace: 'nowrap', background: blue ? VBLUE : '#fff', color: blue ? '#fff' : VINK, border: blue ? 'none' : '1px solid rgba(11,14,20,.18)', borderRadius: 999, padding: '6px 14px', font: `${blue ? 700 : 600} 14px ${VFONT}` }}>{text}</div>;
}
function VDot({ pos, o = 1, size = 16 }) {
  if (!pos || o <= 0) return null;
  return <div style={{ position: 'absolute', left: pos[0] - size / 2, top: pos[1] - size / 2, width: size, height: size, borderRadius: 999, background: VBLUE, opacity: o, boxShadow: '0 0 0 6px rgba(37,99,235,.18), 0 0 18px rgba(37,99,235,.6)' }}></div>;
}
function vTravel(T, pts, a, d) {
  if (T < a || T > a + d + 0.15) return null;
  return <VDot pos={vPoint(pts, VM.glide(T, a, d))} o={1} />;
}
function vLoop(T, pts, a, b, period, count = 2) {
  if (T < a || T > b) return null;
  const out = [];
  for (let i = 0; i < count; i++) {
    const u = (((T - a) / period) + i / count) % 1, fade = Math.min(1, (T - a) / 0.3, (b - T) / 0.3);
    out.push(<VDot key={i} pos={vPoint(pts, u)} o={Math.sin(Math.PI * u) * fade} size={12} />);
  }
  return out;
}
function VCard({ x, y, w, o, ty = 0, children }) {
  if (o <= 0) return null;
  return <div style={{ position: 'absolute', left: x, top: y, width: w, boxSizing: 'border-box', padding: '16px 18px', borderRadius: 12, background: '#fff', border: `1px solid ${VLINE}`, opacity: o, transform: `translateY(${ty}px)`, boxShadow: '0 18px 40px -18px rgba(11,14,20,.35)', fontFamily: VFONT }}>{children}</div>;
}
function vCam(T, keys) {
  if (T <= keys[0][0]) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T <= b[0]) { const u = VM.glide(T, a[0], b[0] - a[0]); return [T, vlerp(a[1], b[1], u), vlerp(a[2], b[2], u), vlerp(a[3], b[3], u)]; }
  }
  return keys[keys.length - 1];
}

function TaxDomePiece({ captions = true, ghost = true }) {
  const { T, CUES: C, time, authoredTotal } = useComposition();
  const end = authoredTotal || (C.Outro + 4);

  const [, cx, cy, s] = vCam(T, [
    [0, 960, 700, 0.74],
    [C.Session - 0.4, 960, 700, 0.76],
    [C.Session + 0.8, 620, 360, 1.22],
    [C.Read, 620, 360, 1.22],
    [C.Read + 0.8, 1180, 400, 1.05],
    [C.Route, 1180, 400, 1.05],
    [C.Route + 0.8, 1100, 560, 0.98],
    [C.Draft, 1100, 560, 0.98],
    [C.Draft + 0.8, 1000, 720, 0.96],
    [C.Approve, 1150, 820, 1.12],
    [C.Write, 1480, 860, 1.12],
    [C.Write + 0.7, 1200, 920, 1.02],
    [C.Overview, 1200, 920, 1.02],
    [C.Overview + 1.5, 960, 700, 0.72],
    [end, 960, 700, 0.74],
  ]);

  const R = {
    taxdome: C.Session + 0.3,
    session: C.Session + 1.5,
    snapshot: C.Read + 0.3,
    knowledge: C.Route + 0.3,
    pipeline: C.Route + 1.6,
    notices: C.Route + 1.85,
    draft: C.Draft + 0.35,
    agents: C.Draft + 1.5,
    telegram: C.Approve + 0.35,
    writeback: C.Write + 0.4,
    log: C.Write + 1.8,
  };
  const A = {
    taxdome: [[C.Session + 0.3, C.Read]],
    session: [[C.Session + 1.5, C.Read + 0.4]],
    snapshot: [[C.Read + 0.3, C.Draft]],
    knowledge: [[C.Route + 0.3, C.Route + 2.2]],
    pipeline: [[C.Route + 1.6, C.Draft + 1.2]],
    notices: [[C.Route + 1.85, C.Draft + 1.4]],
    draft: [[C.Draft + 0.35, C.Approve]],
    agents: [[C.Draft + 1.5, C.Approve + 0.4]],
    telegram: [[C.Approve + 0.35, C.Write + 0.3]],
    writeback: [[C.Write + 0.4, C.Overview]],
    log: [[C.Write + 1.8, C.Overview + 1.2]],
  };
  const E = {
    e1: [C.Session + 1.0, 0.55],
    e2: [C.Read, 0.5],
    eK: [C.Route, 0.55],
    eP: [C.Route + 1.1, 0.55],
    eN: [C.Route + 1.25, 0.55],
    eD: [C.Route + 1.4, 0.6],
    eA: [C.Draft + 1.0, 0.55],
    eT: [C.Approve, 0.5],
    eW: [C.Write, 0.5],
    eL1: [C.Write + 1.3, 0.6],
    eL2: [C.Write + 1.35, 0.55],
    eL3: [C.Write + 1.4, 0.6],
  };
  const ep = (k) => (k === 'eK' || k === 'eT' || k === 'eW') ? VM.enter(T, E[k][0], E[k][1]) : VM.glide(T, E[k][0], E[k][1]);

  const signedIn = T >= C.Session + 2.4;
  const approved = T >= C.Approve + 3.2;
  const sessionIn = VM.enter(T, C.Session + 0.45, 0.45);
  const sessionOut = VM.enter(T, C.Read + 0.2, 0.4);
  const readIn = VM.enter(T, C.Read + 0.7, 0.45);
  const readOut = VM.enter(T, C.Draft + 0.15, 0.4);
  const gateIn = VM.enter(T, C.Approve + 0.7, 0.45);
  const gateOut = VM.enter(T, C.Write + 0.15, 0.4);
  const logIn = VM.enter(T, C.Write + 2.1, 0.45);
  const logOut = VM.enter(T, C.Overview + 0.35, 0.4);
  const f2 = VM.enter(T, C.Route + 1.2, 0.55);
  const f3 = VM.enter(T, C.Draft + 1.1, 0.55);
  const ov = VM.enter(T, C.Overview + 0.9, 0.8);
  const opO = 1 - VM.enter(T, C.Opening + 3.0, 0.8);
  const opText = VM.enter(T, 0.25, 0.7);
  const ouO = VM.enter(T, C.Outro, 0.6);
  const ouText = VM.enter(T, C.Outro + 0.5, 0.6) * (1 - VM.enter(T, C.Outro + 3.1, 0.6));
  const overlay = Math.max(opO, ouO);

  const chips = {
    session: <VChip text={<React.Fragment><VCheck size={13} color={VBLUE} />One tab</React.Fragment>} p={VM.pop(T, C.Session + 2.5, 0.45)} />,
    snapshot: <VChip text="Read" p={VM.pop(T, C.Read + 2.4, 0.45)} dark />,
    draft: <VChip text="Held" p={VM.pop(T, C.Draft + 1.3, 0.45) * (1 - VM.enter(T, C.Write + 0.2, 0.3))} />,
    telegram: <VChip text={<React.Fragment><VCheck size={13} />Approved</React.Fragment>} p={VM.pop(T, C.Approve + 3.2, 0.45)} blue />,
    writeback: <VChip text={<React.Fragment><VCheck size={13} />Written</React.Fragment>} p={VM.pop(T, C.Write + 1.6, 0.45)} dark />,
  };

  const frameStyle = { position: 'absolute', boxSizing: 'border-box', border: '1.5px dashed rgba(37,99,235,.45)', borderRadius: 14, background: 'rgba(37,99,235,.035)' };
  const kicker = { font: `700 12px ${VFONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: VBLUE, whiteSpace: 'nowrap' };

  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff', fontFamily: VFONT }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1380, transformOrigin: '0 0', transform: `translate(${960 - cx * s}px, ${540 - cy * s}px) scale(${s})` }}>
        <div style={Object.assign({ position: 'absolute', left: -2000, top: -2000, width: 6000, height: 5400 }, VGRID)}></div>

        <div style={{ opacity: ov }}>
          <img src="assets/logo-light.png" alt="Scalevium" style={{ position: 'absolute', left: 80, top: 48, height: 30 }} />
          <div style={Object.assign({}, kicker, { position: 'absolute', left: 80, top: 98, fontSize: 13 })}>Case study · TaxDome workflow</div>
          <div style={{ position: 'absolute', left: 80, top: 120, font: `700 44px/1.1 ${VFONT}`, letterSpacing: '-.015em', color: VINK, whiteSpace: 'nowrap' }}>TaxDome Workflow Automation</div>
          <div style={{ position: 'absolute', right: 80, top: 128, maxWidth: 640, textAlign: 'right', font: `500 17px/1.4 ${VFONT}`, color: VBODY }}>Client files read from TaxDome. Updates written back only after a person approves them.</div>
        </div>

        <div style={Object.assign({}, frameStyle, { left: 500, top: 490, width: 1360, height: 200, opacity: f2 })}></div>
        <div style={Object.assign({}, frameStyle, { left: 500, top: 770, width: 1360, height: 200, opacity: f3 })}></div>

        <svg width="1920" height="1380" viewBox="0 0 1920 1380" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} fill="none">
          <defs>
            <marker id="tvk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={VINK}></path></marker>
            <marker id="tvb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={VBLUE}></path></marker>
          </defs>
          {Object.keys(EDGES).map((k) => <VEdge key={k} pts={EDGES[k]} p={ep(k)} ghost={ghost} blue={k === 'eK' || k === 'eT' || k === 'eW'} both={k === 'eK'} />)}
        </svg>

        <VPill x={700} y={300} text="opens the workspace" p={VM.pop(T, C.Session + 1.35, 0.4)} />
        <VPill x={1150} y={440} text="reads the live file" blue p={VM.pop(T, C.Route + 1.7, 0.4)} />
        <VPill x={1630} y={440} text="drafts a change" p={VM.pop(T, C.Draft + 0.2, 0.4)} />
        <VPill x={1150} y={730} text="asks on Telegram" blue p={VM.pop(T, C.Approve + 0.15, 0.4)} />
        <VPill x={1630} y={730} text="writes the approval" blue p={VM.pop(T, C.Write + 0.2, 0.4)} />
        <VPill x={1150} y={1000} text="every run logged" p={VM.pop(T, C.Write + 1.7, 0.4)} />

        {Object.keys(NODES).map((k) => <VNode key={k} n={NODES[k]} r={VM.pop(T, R[k], 0.55)} act={vAct(T, A[k])} ghost={ghost} chip={chips[k]} />)}

        {vTravel(T, EDGES.e1, E.e1[0], E.e1[1])}
        {vTravel(T, EDGES.e2, E.e2[0], E.e2[1])}
        {T > C.Route + 0.2 && T < C.Route + 1.8 && <VDot size={12} pos={vPoint(EDGES.eK, 0.5 - 0.5 * Math.cos(2 * Math.PI * (T - C.Route - 0.2) / 0.8))} o={Math.min(1, (T - C.Route - 0.2) / 0.2, (C.Route + 1.8 - T) / 0.2)} />}
        {vTravel(T, EDGES.eN, E.eN[0], E.eN[1])}
        {vTravel(T, EDGES.eD, E.eD[0], E.eD[1])}
        {vTravel(T, EDGES.eA, E.eA[0], E.eA[1])}
        {vTravel(T, EDGES.eT, E.eT[0], E.eT[1])}
        {vTravel(T, EDGES.eW, E.eW[0], E.eW[1])}
        {vLoop(T, EDGES.eL1, C.Write + 2.0, C.Overview + 0.8, 1.4)}
        {vLoop(T, EDGES.eL2, C.Write + 2.0, C.Overview + 0.8, 1.0)}
        {vLoop(T, EDGES.eL3, C.Write + 2.0, C.Overview + 0.8, 1.4)}

        <VCard x={80} y={40} w={460} o={sessionIn * (1 - sessionOut)} ty={12 * (1 - sessionIn)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: signedIn ? VBLUE : VINK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18"></path></svg>
            </div>
            <div>
              <div style={{ font: `700 20px ${VFONT}`, color: VINK }}>{signedIn ? 'Signed in to TaxDome' : 'Opening the workspace'}</div>
              <div style={{ marginTop: 2, font: `500 15px ${VFONT}`, color: VBODY }}>{signedIn ? 'One tab · login kept' : 'The firm’s own account'}</div>
            </div>
          </div>
        </VCard>

        <VCard x={80} y={430} w={400} o={readIn * (1 - readOut)} ty={12 * (1 - readIn)}>
          <div style={kicker}>Live read · ARIA snapshot</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
            {READ_ROWS.map(([name, stage, note], i) => {
              const p = VM.enter(T, C.Read + 1.1 + i * 0.7, 0.35);
              return (
                <div key={name} style={{ opacity: p, display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, padding: '10px 0', borderTop: i ? `1px solid ${VLINE}` : 'none' }}>
                  <div>
                    <div style={{ font: `700 16px ${VFONT}`, color: VINK }}>{name}</div>
                    <div style={{ marginTop: 2, font: `500 13px ${VFONT}`, color: VBODY }}>{note}</div>
                  </div>
                  <div style={{ alignSelf: 'center', font: `700 12px ${VFONT}`, color: VBLUE_D, background: VTINT, borderRadius: 999, padding: '4px 10px' }}>{stage}</div>
                </div>
              );
            })}
          </div>
        </VCard>

        <VCard x={80} y={430} w={400} o={gateIn * (1 - gateOut)} ty={12 * (1 - gateIn)}>
          <div style={kicker}>Telegram</div>
          <div style={{ marginTop: 10, font: `700 18px/1.35 ${VFONT}`, color: VINK }}>Approve the stage update for this client file?</div>
          <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '8px 14px', background: approved ? VBLUE : VINK, color: '#fff', font: `700 14px ${VFONT}` }}>
            {approved && <VCheck size={14} />}
            {approved ? 'Approved · write unlocked' : 'Waiting on a person'}
          </div>
        </VCard>

        <VCard x={1420} y={1000} w={420} o={logIn * (1 - logOut)} ty={12 * (1 - logIn)}>
          <div style={kicker}>This morning’s runs</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
            {LOG_ROWS.map(([tm, what, res], i) => {
              const p = VM.enter(T, C.Write + 2.3 + 0.35 * i, 0.35);
              return (
                <div key={tm} style={{ opacity: p, display: 'grid', gridTemplateColumns: '78px 1fr auto', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: i ? `1px solid ${VLINE}` : 'none' }}>
                  <div style={{ font: `600 14px ${VFONT}`, color: VBODY }}>{tm}</div>
                  <div style={{ font: `600 16px ${VFONT}`, color: VINK }}>{what}</div>
                  <div style={{ font: `700 13px ${VFONT}`, color: VBLUE_D, background: VTINT, borderRadius: 999, padding: '4px 10px' }}>{res}</div>
                </div>
              );
            })}
          </div>
        </VCard>

        <div style={{ position: 'absolute', left: 80, top: 500, width: 380, opacity: ov }}>
          <div style={Object.assign({}, kicker, { fontSize: 13 })}>Guardrails</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {GUARDRAILS.map(([h, b]) => (
              <div key={h} style={{ borderTop: `2px solid ${VINK}`, paddingTop: 10 }}>
                <div style={{ font: `700 18px ${VFONT}`, color: VINK }}>{h}</div>
                <div style={{ marginTop: 4, font: `400 15px/1.4 ${VFONT}`, color: VBODY }}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', left: 80, right: 80, top: 1288, paddingTop: 18, borderTop: `1px solid ${VLINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: ov }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ font: `700 13px ${VFONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: VINK, marginRight: 6 }}>Stack</span>
            {INTEGRATIONS.map((x) => <span key={x} style={{ font: `600 14px ${VFONT}`, color: VINK, background: '#F6F7F9', border: '1px solid rgba(11,14,20,.12)', borderRadius: 999, padding: '5px 12px' }}>{x}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 20, font: `600 15px ${VFONT}`, whiteSpace: 'nowrap' }}><span style={{ color: VINK }}>Engineering Without Limits</span><span style={{ color: VBLUE }}>scalevium.com</span></div>
        </div>
      </div>

      {captions && (
        <Captions items={[
          { at: C.Session + 0.4, until: C.Read, text: 'TaxDome has no public API, so the automation opens the firm’s own signed-in workspace.' },
          { at: C.Read + 0.3, until: C.Route, text: 'It reads pipelines, stages, notes, and IRS notices from an ARIA snapshot.' },
          { at: C.Route + 0.3, until: C.Draft, text: 'Training videos became a map of how the firm moves through TaxDome.' },
          { at: C.Draft + 0.3, until: C.Approve, text: 'That context goes to the four-agent system, and a proposed update is prepared.' },
          { at: C.Approve + 0.3, until: C.Write, text: 'Every write waits on Telegram. Nothing is saved until a person approves it.' },
          { at: C.Write + 0.3, until: C.Overview, text: 'The same browser session writes back only the change that was approved.' },
          { at: C.Overview + 1.6, until: C.Outro, text: 'Reads stay automatic. Writes stay behind a person.' },
        ]} style={{ left: 64, right: 'auto', bottom: 48, maxWidth: 1240, textAlign: 'left', font: `600 28px/1.35 ${VFONT}`, color: '#fff', textShadow: 'none', background: VINK, padding: '16px 24px', borderRadius: 10 }} />
      )}

      {overlay > 0 && (
        <div style={Object.assign({ position: 'absolute', inset: 0, background: '#fff', opacity: overlay }, VGRID)}>
          <div style={{ position: 'absolute', left: 140, right: 140, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, opacity: opText * opO, transform: `translateY(${20 * (1 - opText)}px)` }}>
            <img src="assets/logo-light.png" alt="Scalevium" style={{ height: 40, alignSelf: 'flex-start' }} />
            <div style={{ width: 64, height: 5, background: VBLUE, borderRadius: 3, marginTop: 24 }}></div>
            <div style={Object.assign({}, kicker, { fontSize: 18 })}>Case study · Tax operations</div>
            <div style={{ font: `700 84px/1.02 ${VFONT}`, letterSpacing: '-.03em', color: VINK, maxWidth: 1500 }}>TaxDome<br />Workflow Automation</div>
            <div style={{ font: `500 32px ${VFONT}`, color: VBODY, maxWidth: 1100 }}>Browser automation for a tax firm, with a person approving every write.</div>
          </div>
          <div style={{ position: 'absolute', left: 140, right: 140, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, opacity: ouText, transform: `translateY(${20 * (1 - Math.min(1, ouText * 1.2))}px)` }}>
            <img src="assets/logo-light.png" alt="Scalevium" style={{ height: 56, alignSelf: 'flex-start' }} />
            <div style={{ font: `700 64px/1.1 ${VFONT}`, letterSpacing: '-.02em', color: VINK, marginTop: 20 }}>Engineering Without Limits</div>
            <div style={{ font: `600 32px ${VFONT}`, color: VBLUE }}>scalevium.com</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaxDomeVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, captions: true, ghostChart: true });
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#ffffff">
        <TaxDomePiece captions={t.captions} ghost={t.ghostChart} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Video" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Captions" value={t.captions} onChange={(v) => setTweak('captions', v)} />
        <TweakToggle label="Blueprint outlines before reveal" value={t.ghostChart} onChange={(v) => setTweak('ghostChart', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.TaxDomeVideo = TaxDomeVideo;
