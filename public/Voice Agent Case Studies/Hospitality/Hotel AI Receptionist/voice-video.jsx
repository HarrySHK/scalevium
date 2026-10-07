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

function vNodes(D) {
  return {
    caller: { x: 80, y: 220, w: 300, k: 'Caller', t: D.caller.t, s: D.caller.s },
    phone: { x: 460, y: 220, w: 300, k: 'Telephony', t: 'Your existing number', s: 'All calls, after hours or overflow' },
    voice: { x: 820, y: 220, w: 300, k: 'Voice layer', t: 'Speech in, voice out', s: 'Hears the caller, replies naturally' },
    agent: { x: 1180, y: 220, w: 320, k: 'AI agent', t: 'Scalevium voice agent', s: 'Understands the request, picks the next step', kind: 'ink' },
    know: { x: 1560, y: 220, w: 280, k: 'Knowledge', t: 'Your rules', s: D.know, kind: 'kb' },
    book: { x: 760, y: 480, w: 280, k: 'Books', t: D.book.t, s: D.book.s },
    ans: { x: 1200, y: 480, w: 280, k: 'Answers', t: D.ans.t, s: D.ans.s },
    esc: { x: 1560, y: 480, w: 280, k: 'Hands off', t: D.esc.t, s: D.esc.s, kind: 'gate' },
    sys: { x: 760, y: 740, w: 280, k: 'Writes to', t: D.sys.t, s: D.sys.s },
    sms: { x: 1200, y: 740, w: 280, k: 'Messaging', t: D.sms.t, s: D.sms.s },
    team: { x: 1560, y: 740, w: 280, k: 'Your team', t: D.team.t, s: D.team.s },
    dash: { x: 1200, y: 1000, w: 280, k: 'Your team sees', t: 'Call dashboard', s: 'Transcript, summary, outcome', kind: 'blue' },
  };
}
const VEDGES = {
  e1: [[380, 290], [458, 290]], e2: [[760, 290], [818, 290]], e3: [[1120, 290], [1178, 290]], eK: [[1502, 290], [1558, 290]],
  eB: [[1260, 360], [1260, 420], [900, 420], [900, 478]], eA: [[1340, 360], [1340, 478]], eE: [[1420, 360], [1420, 420], [1700, 420], [1700, 478]],
  eS: [[900, 620], [900, 738]], eM: [[1340, 620], [1340, 738]], eT: [[1700, 620], [1700, 738]],
  eD1: [[900, 880], [900, 1070], [1198, 1070]], eD2: [[1340, 880], [1340, 998]], eD3: [[1700, 880], [1700, 1070], [1482, 1070]],
};

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
  const d = vRounded(pts), id = blue ? 'vvb' : 'vvk';
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
function VCard({ x, y, w, o, ty = 0, dark, children }) {
  if (o <= 0) return null;
  return <div style={{ position: 'absolute', left: x, top: y, width: w, boxSizing: 'border-box', padding: '16px 18px', borderRadius: 12, background: dark ? VINK : '#fff', border: dark ? 'none' : `1px solid ${VLINE}`, opacity: o, transform: `translateY(${ty}px)`, boxShadow: '0 18px 40px -18px rgba(11,14,20,.35)', fontFamily: VFONT }}>{children}</div>;
}
function vCam(T, keys) {
  if (T <= keys[0][0]) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T <= b[0]) { const u = VM.glide(T, a[0], b[0] - a[0]); return [T, vlerp(a[1], b[1], u), vlerp(a[2], b[2], u), vlerp(a[3], b[3], u)]; }
  }
  return keys[keys.length - 1];
}
function Wave({ T, on }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 22 }}>
      {Array.from({ length: 14 }).map((_, i) => {
        const h = on ? 5 + 15 * Math.abs(Math.sin(T * 9 + i * 0.9) * Math.sin(T * 3.1 + i * 0.4)) : 4;
        return <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: on ? VBLUE : 'rgba(11,14,20,.2)' }}></div>;
      })}
    </div>
  );
}

function VoicePiece({ D, captions = true, ghost = true }) {
  const { T, CUES: C, time, authoredTotal } = useComposition();
  const end = authoredTotal || (C.Outro + 4);
  const N = vNodes(D);

  const [, cx, cy, s] = vCam(T, [
    [0, 960, 690, 0.76], [C.Ring - 0.6, 960, 690, 0.78],
    [C.Ring + 1.0, 560, 440, 1.3], [C.Listen, 560, 440, 1.32],
    [C.Listen + 1.0, 820, 450, 1.15], [C.Understand, 820, 450, 1.17],
    [C.Understand + 1.0, 1010, 470, 1.0], [C.Act, 1010, 470, 1.02],
    [C.Act + 1.0, 900, 600, 1.05], [C.Confirm, 900, 600, 1.07],
    [C.Confirm + 0.8, 1100, 720, 1.1], [C.Handoff, 1100, 720, 1.12],
    [C.Handoff + 0.9, 1500, 700, 1.15], [C.Dashboard, 1500, 700, 1.17],
    [C.Dashboard + 0.9, 1340, 880, 1.1], [C.Overview, 1340, 880, 1.12],
    [C.Overview + 1.6, 960, 690, 0.76], [end, 960, 690, 0.78],
  ]);

  const R = { caller: C.Ring + 0.3, phone: C.Ring + 2.2, voice: C.Listen + 0.3, agent: C.Listen + 1.6, know: C.Understand + 0.6, book: C.Understand + 2.2, ans: C.Understand + 2.35, esc: C.Understand + 2.5, sys: C.Act + 1.0, sms: C.Confirm + 0.4, team: C.Handoff + 1.2, dash: C.Dashboard + 0.8 };
  const A = {
    caller: [[C.Ring + 0.3, C.Listen + 1]], phone: [[C.Ring + 2.2, C.Listen + 0.5]], voice: [[C.Listen + 0.3, C.Understand]], agent: [[C.Listen + 1.6, C.Act + 0.5]],
    know: [[C.Understand + 0.6, C.Understand + 2.4]], book: [[C.Understand + 2.6, C.Act + 5]], sys: [[C.Act + 1.0, C.Confirm + 0.5]],
    ans: [[C.Confirm, C.Handoff]], sms: [[C.Confirm + 0.4, C.Handoff]], esc: [[C.Handoff + 0.2, C.Handoff + 5]], team: [[C.Handoff + 1.2, C.Dashboard]], dash: [[C.Dashboard + 0.8, C.Overview + 0.8]],
  };
  const E = {
    e1: [C.Ring + 1.6, 0.6], e2: [C.Listen, 0.5], e3: [C.Listen + 1.2, 0.5], eK: [C.Understand + 0.2, 0.5],
    eB: [C.Understand + 1.8, 0.6], eA: [C.Understand + 1.9, 0.6], eE: [C.Understand + 2.0, 0.6],
    eS: [C.Act + 0.4, 0.6], eM: [C.Confirm, 0.5], eT: [C.Handoff + 0.6, 0.6],
    eD1: [C.Dashboard + 0.2, 0.7], eD2: [C.Dashboard + 0.25, 0.6], eD3: [C.Dashboard + 0.3, 0.7],
  };
  const ep = (k) => k === 'eK' ? VM.enter(T, E[k][0], E[k][1]) : VM.glide(T, E[k][0], E[k][1]);
  const chips = {
    phone: <VChip text={<React.Fragment><VCheck size={13} color={VBLUE} />First ring</React.Fragment>} p={VM.pop(T, C.Ring + 3.0, 0.5)} />,
    sys: <VChip text={<React.Fragment><VCheck size={13} />Booked</React.Fragment>} p={VM.pop(T, C.Act + 4.2, 0.5)} blue />,
    sms: <VChip text={<React.Fragment><VCheck size={13} />Sent</React.Fragment>} p={VM.pop(T, C.Confirm + 1.6, 0.5)} dark />,
    team: <VChip text="Transferred" p={VM.pop(T, C.Handoff + 3.0, 0.5)} dark />,
  };

  // ringing card
  const rgIn = VM.enter(T, C.Ring + 0.5, 0.5), rgOut = VM.enter(T, C.Listen + 1.4, 0.5);
  const answered = T >= C.Ring + 3.0;
  const ringPulse = answered ? 0 : (Math.sin(T * 14) > 0 ? 1 : 0);

  // transcript
  const tIn = VM.enter(T, C.Ring + 2.8, 0.5);
  const lineAt = [C.Listen + 0.8, C.Understand + 2.9, C.Act + 0.4, C.Act + 2.9];
  const lineDur = D.transcript.map(([, txt]) => Math.max(1.2, txt.length / 42));
  const overview = T >= C.Overview;
  let speaking = null;
  const lines = D.transcript.map(([who, txt], i) => {
    const u = overview ? 1 : clamp((T - lineAt[i]) / lineDur[i], 0, 1);
    if (u > 0 && u < 1) speaking = who;
    const shown = txt.slice(0, Math.ceil(txt.length * u));
    return { who, txt, shown, o: overview ? 1 : VM.enter(T, lineAt[i], 0.3) };
  });

  // sms card
  const smIn = VM.enter(T, C.Confirm + 1.2, 0.5), smOut = VM.enter(T, C.Handoff + 0.3, 0.4);
  // handoff summary
  const hsIn = VM.enter(T, C.Handoff + 2.0, 0.5), hsOut = VM.enter(T, C.Dashboard + 0.3, 0.4);
  // dashboard log
  const lgIn = VM.enter(T, C.Dashboard + 1.4, 0.5), lgOut = VM.enter(T, C.Overview + 0.4, 0.4);

  const f2 = VM.enter(T, C.Understand + 1.8, 0.6), f3 = VM.enter(T, C.Act + 0.6, 0.6);
  const ov = VM.enter(T, C.Overview + 1.0, 0.8);
  const opO = 1 - VM.enter(T, C.Opening + 3.0, 0.8), opText = VM.enter(T, 0.25, 0.7);
  const ouO = VM.enter(T, C.Outro, 0.6), ouText = VM.enter(T, C.Outro + 0.5, 0.6) * (1 - VM.enter(T, C.Outro + 3.1, 0.6));
  const overlay = Math.max(opO, ouO);
  const logoO = VM.enter(T, C.Ring + 0.2, 0.5) * (1 - VM.enter(T, C.Overview + 0.4, 0.5));

  const frameStyle = { position: 'absolute', boxSizing: 'border-box', border: '1.5px dashed rgba(37,99,235,.45)', borderRadius: 14, background: 'rgba(37,99,235,.035)' };
  const kicker = { font: `700 12px ${VFONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: VBLUE, whiteSpace: 'nowrap' };

  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff', fontFamily: VFONT }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1380, transformOrigin: '0 0', transform: `translate(${960 - cx * s}px, ${540 - cy * s}px) scale(${s})` }}>
        <div style={Object.assign({ position: 'absolute', left: -2000, top: -2000, width: 6000, height: 5400 }, VGRID)}></div>

        <div style={{ opacity: ov }}>
          <img src="assets/logo-light.png" alt="Scalevium" style={{ position: 'absolute', left: 80, top: 48, height: 30 }} />
          <div style={Object.assign({}, kicker, { position: 'absolute', left: 80, top: 98, fontSize: 13 })}>Case study · Voice agent call flow</div>
          <div style={{ position: 'absolute', left: 80, top: 120, font: `700 44px/1.1 ${VFONT}`, letterSpacing: '-.015em', color: VINK, whiteSpace: 'nowrap' }}>{D.title}</div>
          <div style={{ position: 'absolute', right: 80, top: 136, maxWidth: 820, textAlign: 'right', font: `500 17px/1.4 ${VFONT}`, color: VBODY }}>{D.outcome}</div>
        </div>

        <div style={Object.assign({}, frameStyle, { left: 740, top: 450, width: 1140, height: 210, opacity: f2 })}></div>
        <div style={Object.assign({}, kicker, { position: 'absolute', left: 764, top: 632, opacity: f2 })}>The agent decides</div>
        <div style={Object.assign({}, frameStyle, { left: 740, top: 710, width: 1140, height: 210, opacity: f3 })}></div>
        <div style={Object.assign({}, kicker, { position: 'absolute', left: 764, top: 892, opacity: f3 })}>Connected to your systems</div>

        <svg width="1920" height="1380" viewBox="0 0 1920 1380" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} fill="none">
          <defs>
            <marker id="vvk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={VINK}></path></marker>
            <marker id="vvb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={VBLUE}></path></marker>
          </defs>
          {Object.keys(VEDGES).map((k) => <VEdge key={k} pts={VEDGES[k]} p={ep(k)} ghost={ghost} blue={k === 'eK'} both={k === 'eK'} />)}
        </svg>

        <VPill x={1340} y={420} text="routes by intent" blue p={VM.pop(T, C.Understand + 2.0, 0.5)} />
        <VPill x={900} y={685} text="live write" p={VM.pop(T, C.Act + 0.9, 0.5)} />
        <VPill x={1340} y={685} text="sends details" p={VM.pop(T, C.Confirm + 0.4, 0.5)} />
        <VPill x={1700} y={685} text="warm transfer" p={VM.pop(T, C.Handoff + 1.0, 0.5)} />
        <VPill x={1340} y={950} text="every call logged" p={VM.pop(T, C.Dashboard + 0.8, 0.5)} />

        {Object.keys(N).map((k) => <VNode key={k} n={N[k]} r={VM.pop(T, R[k], 0.55)} act={vAct(T, A[k])} ghost={ghost} chip={chips[k]} />)}

        {vTravel(T, VEDGES.e1, E.e1[0], E.e1[1])}
        {vTravel(T, VEDGES.e2, E.e2[0], E.e2[1])}
        {vTravel(T, VEDGES.e3, E.e3[0], E.e3[1])}
        {T > C.Understand + 0.6 && T < C.Understand + 2.2 && <VDot size={12} pos={vPoint(VEDGES.eK, 0.5 - 0.5 * Math.cos(2 * Math.PI * (T - C.Understand - 0.6) / 0.8))} o={Math.min(1, (T - C.Understand - 0.6) / 0.2, (C.Understand + 2.2 - T) / 0.2)} />}
        {vTravel(T, VEDGES.eB, E.eB[0], E.eB[1])}
        {vTravel(T, VEDGES.eS, E.eS[0], E.eS[1])}
        {vTravel(T, VEDGES.eM, E.eM[0], E.eM[1])}
        {vTravel(T, VEDGES.eT, E.eT[0], E.eT[1])}
        {vLoop(T, VEDGES.eD1, C.Dashboard + 1.0, C.Overview + 0.6, 1.4)}
        {vLoop(T, VEDGES.eD2, C.Dashboard + 1.0, C.Overview + 0.6, 1.0)}
        {vLoop(T, VEDGES.eD3, C.Dashboard + 1.0, C.Overview + 0.6, 1.4)}

        <VCard x={80} y={30} w={480} o={rgIn * (1 - rgOut)} ty={12 * (1 - rgIn)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: answered ? VBLUE : VINK, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${8 * ringPulse}px rgba(37,99,235,.2)` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div style={{ font: `700 20px ${VFONT}`, color: VINK }}>{answered ? 'Answered by the AI agent' : 'Incoming call'}</div>
              <div style={{ marginTop: 2, font: `500 15px ${VFONT}`, color: VBODY }}>{D.callTime} · {answered ? 'no hold, no voicemail' : 'ringing'}</div>
            </div>
          </div>
        </VCard>

        <VCard x={80} y={480} w={600} o={tIn} ty={12 * (1 - tIn)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={kicker}>Live call · {D.callTime}</div>
            <Wave T={T} on={!!speaking && !overview} />
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {lines.map((l, i) => l.o > 0 && (
              <div key={i} style={{ opacity: l.o, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ font: `700 12px ${VFONT}`, letterSpacing: '.08em', textTransform: 'uppercase', color: l.who === 'ai' ? VBLUE : VINK }}>{l.who === 'ai' ? 'AI agent' : 'Caller'}</div>
                <div style={{ font: `500 18px/1.4 ${VFONT}`, color: l.who === 'ai' ? VINK : VBODY, position: 'relative' }}>
                  <span style={{ visibility: 'hidden' }}>{l.txt}</span>
                  <span style={{ position: 'absolute', left: 0, top: 0 }}>{l.shown}</span>
                </div>
              </div>
            ))}
          </div>
        </VCard>

        <VCard x={1200} y={950} w={320} o={smIn * (1 - smOut)} ty={12 * (1 - smIn)}>
          <div style={kicker}>Text message</div>
          <div style={{ marginTop: 10, padding: '12px 14px', borderRadius: 12, background: VTINT, font: `500 16px/1.45 ${VFONT}`, color: VINK }}>{D.smsText}</div>
        </VCard>

        <VCard x={1540} y={950} w={320} o={hsIn * (1 - hsOut)} ty={12 * (1 - hsIn)}>
          <div style={kicker}>Summary passed on</div>
          <div style={{ marginTop: 8, font: `500 17px/1.45 ${VFONT}`, color: VINK }}>{D.handoffSummary}</div>
        </VCard>

        <VCard x={1520} y={1000} w={360} o={lgIn * (1 - lgOut)} ty={12 * (1 - lgIn)}>
          <div style={kicker}>Tonight's calls</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
            {D.log.map(([tm, what, res], i) => {
              const p = VM.enter(T, C.Dashboard + 1.8 + 0.35 * i, 0.4);
              return (
                <div key={i} style={{ opacity: p, display: 'grid', gridTemplateColumns: '84px 1fr auto', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: i ? `1px solid ${VLINE}` : 'none' }}>
                  <div style={{ font: `600 14px ${VFONT}`, color: VBODY }}>{tm}</div>
                  <div style={{ font: `600 16px ${VFONT}`, color: VINK }}>{what}</div>
                  <div style={{ font: `700 13px ${VFONT}`, color: VBLUE_D, background: VTINT, borderRadius: 999, padding: '4px 10px' }}>{res}</div>
                </div>
              );
            })}
          </div>
        </VCard>

        <div style={{ position: 'absolute', left: 80, top: 930, width: 600, opacity: ov }}>
          <div style={Object.assign({}, kicker, { fontSize: 13 })}>Guardrails</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {D.guardrails.map(([h, b], i) => (
              <div key={i} style={{ borderTop: `2px solid ${VINK}`, paddingTop: 10 }}>
                <div style={{ font: `700 19px ${VFONT}`, color: VINK }}>{h}</div>
                <div style={{ marginTop: 4, font: `400 16px/1.4 ${VFONT}`, color: VBODY }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1300, paddingTop: 20, borderTop: `1px solid ${VLINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: ov }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ font: `700 13px ${VFONT}`, letterSpacing: '.1em', textTransform: 'uppercase', color: VINK, marginRight: 6 }}>Integrations</span>
            {D.integrations.map((x) => <span key={x} style={{ font: `600 14px ${VFONT}`, color: VINK, background: '#F6F7F9', border: '1px solid rgba(11,14,20,.12)', borderRadius: 999, padding: '5px 12px' }}>{x}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 20, font: `600 15px ${VFONT}` }}><span style={{ color: VINK }}>Engineering Without Limits</span><span style={{ color: VBLUE }}>scalevium.com</span></div>
        </div>
      </div>

      {logoO > 0 && <img src="assets/logo-light.png" alt="Scalevium" style={{ position: 'absolute', left: 64, top: 52, height: 26, opacity: logoO }} />}

      {captions && (
        <Captions items={[
          { at: C.Ring + 0.6, until: C.Listen, text: `${D.caller.t}. The AI agent answers on the first ring.` },
          { at: C.Listen + 0.3, until: C.Understand, text: "Speech recognition turns the caller's words into text. The agent replies in a natural voice." },
          { at: C.Understand + 0.3, until: C.Act, text: 'The agent works out what the caller needs, using only your rules and knowledge.' },
          { at: C.Act + 0.3, until: C.Confirm, text: `It checks live availability and books straight into ${D.systemShort}.` },
          { at: C.Confirm + 0.3, until: C.Handoff, text: 'The caller gets a text confirmation before they hang up.' },
          { at: C.Handoff + 0.3, until: C.Dashboard, text: D.handoffCaption },
          { at: C.Dashboard + 0.3, until: C.Overview, text: 'Every call is logged with a transcript, summary and outcome.' },
          { at: C.Overview + 2.0, until: C.Outro, text: D.outcome },
        ]} style={{ left: 64, right: 'auto', bottom: 56, maxWidth: 1240, textAlign: 'left', font: `600 30px/1.35 ${VFONT}`, color: '#fff', textShadow: 'none', background: VINK, padding: '18px 26px', borderRadius: 10 }} />
      )}

      {overlay > 0 && (
        <div style={Object.assign({ position: 'absolute', inset: 0, background: '#fff', opacity: overlay }, VGRID)}>
          <div style={{ position: 'absolute', left: 140, right: 140, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, opacity: opText * opO, transform: `translateY(${20 * (1 - opText)}px)` }}>
            <img src="assets/logo-light.png" alt="Scalevium" style={{ height: 40, alignSelf: 'flex-start' }} />
            <div style={{ width: 64, height: 5, background: VBLUE, borderRadius: 3, marginTop: 24 }}></div>
            <div style={Object.assign({}, kicker, { fontSize: 18 })}>Case study · {D.kicker}</div>
            <div style={{ font: `700 92px/1.04 ${VFONT}`, letterSpacing: '-.025em', color: VINK, maxWidth: 1400 }}>{D.titleLines[0]}<br />{D.titleLines[1]}</div>
            <div style={{ font: `500 36px ${VFONT}`, color: VBODY }}>An AI voice agent {D.sub}</div>
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

function VoiceAgentVideo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, captions: true, ghostChart: true });
  const D = (window.VA_INDUSTRIES || {})[window.VA_INDUSTRY || 'hotel'];
  if (!D) return null;
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#ffffff">
        <VoicePiece D={D} captions={t.captions} ghost={t.ghostChart} />
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
window.VoiceAgentVideo = VoiceAgentVideo;
