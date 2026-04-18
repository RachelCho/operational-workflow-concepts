// Page screens for Partner Dashboard

const { useState: useStateS } = React;

// ───────── Sample data ─────────
const SAMPLE_VISITS = [
  { id: "V-2041", patient: "Martha Nguyen",    clinician: "Dr. Priya Rao",    time: "9:00 AM",  city: "Pasadena, CA", type: "Lab draw",         status: "completed" },
  { id: "V-2042", patient: "Jordan Williams",  clinician: "—",                time: "9:30 AM",  city: "Glendale, CA", type: "Wellness check",   status: "needs" },
  { id: "V-2043", patient: "Elena Rodriguez",  clinician: "Dr. Aman Patel",   time: "10:15 AM", city: "Burbank, CA",  type: "Post-op follow up", status: "enroute" },
  { id: "V-2044", patient: "Samuel Chen",      clinician: "Dr. Lauren Kim",   time: "11:00 AM", city: "Glendale, CA", type: "Vitals",           status: "scheduled" },
  { id: "V-2045", patient: "Wendy Park",       clinician: "Dr. Priya Rao",    time: "11:45 AM", city: "Pasadena, CA", type: "Lab draw",         status: "review" },
  { id: "V-2046", patient: "Arjun Bhatia",     clinician: "—",                time: "1:00 PM",  city: "Los Angeles, CA", type: "Wound care",    status: "failed" },
  { id: "V-2047", patient: "Maya Olson",       clinician: "Dr. Aman Patel",   time: "2:30 PM",  city: "Pasadena, CA", type: "Wellness check",   status: "scheduled" },
];

const SAMPLE_CLINICIANS = [
  { name: "Dr. Priya Rao",    role: "RN, BSN",    region: "Pasadena",    visits: 28, score: 94, active: true  },
  { name: "Dr. Aman Patel",   role: "MD",         region: "Burbank",     visits: 22, score: 91, active: true  },
  { name: "Dr. Lauren Kim",   role: "NP",         region: "Glendale",    visits: 19, score: 88, active: true  },
  { name: "Dr. Marcus Webb",  role: "RN",         region: "Los Angeles", visits: 15, score: 82, active: false },
  { name: "Dr. Nina Alvarez", role: "MD",         region: "Pasadena",    visits: 24, score: 96, active: true  },
];

// ───────── Today screen ─────────
const TodayScreen = () => {
  const [tab, setTab] = useStateS("all");
  const filtered = tab === "all" ? SAMPLE_VISITS : SAMPLE_VISITS.filter(v => v.status === tab);

  return (
    <PageContainer>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "var(--color-fg-muted)", fontFamily: "var(--font-sans)" }}>Saturday, April 18 2026</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--color-fg-default)", fontFamily: "var(--font-sans)", marginTop: 2 }}>
            Good morning, Rachel.
          </div>
        </div>
        <Button variant="secondary" icon="download">Export</Button>
        <Button variant="secondary" icon="filter_list">Filter</Button>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KpiCard label="Visits today"        value="86"  delta="+12%" icon="calendar_month"  accent="var(--axle-teal)" />
        <KpiCard label="Needs assignment"    value="12"  delta="-4%"  icon="warning"         accent="var(--yellow-500)" />
        <KpiCard label="Completed"           value="48"  delta="+8%"  icon="check_circle"    accent="var(--green-600)" />
        <KpiCard label="Active clinicians"   value="14"  delta="+1"   icon="groups"          accent="var(--axle-navy)" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <Alert kind="warning"
          title="3 visits still need assignment for today"
          body="Auto-match can cover 2 of these. Review assignments before 12:00 PM to avoid reschedule." />
      </div>

      <div style={{
        background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
        padding: 20, boxShadow: "var(--shadow-xs)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans)", color: "var(--color-fg-default)" }}>Today's visit queue</div>
            <div style={{ fontSize: 13, color: "var(--color-fg-muted)", fontFamily: "var(--font-sans)", marginTop: 2 }}>
              {filtered.length} visits · updated just now
            </div>
          </div>
          <Button variant="ghost" size="sm" icon="refresh">Refresh</Button>
        </div>

        <Tabs
          items={[
            { key: "all",       label: "All",          count: SAMPLE_VISITS.length },
            { key: "needs",     label: "Needs assignment", count: SAMPLE_VISITS.filter(v => v.status === "needs").length },
            { key: "enroute",   label: "En route",     count: SAMPLE_VISITS.filter(v => v.status === "enroute").length },
            { key: "completed", label: "Completed",    count: SAMPLE_VISITS.filter(v => v.status === "completed").length },
            { key: "review",    label: "In review",    count: SAMPLE_VISITS.filter(v => v.status === "review").length },
          ]}
          current={tab}
          onChange={setTab}
        />

        <DashboardTable
          columns={[
            { key: "id",        label: "Visit",     w: "90px" },
            { key: "patient",   label: "Patient",   render: r => (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={r.patient} size={28} color={`hsl(${(r.patient.charCodeAt(0)*37) % 360}, 55%, 48%)`} />
                <div>
                  <div style={{ fontWeight: 600, color: "var(--color-fg-default)" }}>{r.patient}</div>
                  <div style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{r.city}</div>
                </div>
              </div>
            ) },
            { key: "type",      label: "Type" },
            { key: "time",      label: "Time",      w: "100px" },
            { key: "clinician", label: "Clinician", render: r => r.clinician === "—"
              ? <span style={{ color: "var(--color-fg-muted)", fontStyle: "italic" }}>Unassigned</span>
              : r.clinician },
            { key: "status",    label: "Status",    w: "170px", render: r => <StatusChip kind={r.status} /> },
          ]}
          rows={filtered}
          onRowClick={() => {}}
        />
      </div>
    </PageContainer>
  );
};

// ───────── Visits screen ─────────
const VisitsScreen = () => (
  <PageContainer>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "var(--color-fg-muted)", fontFamily: "var(--font-sans)" }}>All scheduled visits</div>
      </div>
      <Button variant="secondary" icon="filter_list">Filter</Button>
      <Button variant="secondary" icon="calendar_month">April 2026</Button>
      <Button variant="primary" icon="add">Schedule visit</Button>
    </div>

    <div style={{
      background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
      padding: 20, boxShadow: "var(--shadow-xs)",
    }}>
      <DashboardTable
        columns={[
          { key: "id",        label: "Visit",     w: "90px" },
          { key: "patient",   label: "Patient",   render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={r.patient} size={28} color={`hsl(${(r.patient.charCodeAt(0)*37) % 360}, 55%, 48%)`} />
              <div>
                <div style={{ fontWeight: 600 }}>{r.patient}</div>
                <div style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{r.city}</div>
              </div>
            </div>
          ) },
          { key: "type",      label: "Type" },
          { key: "time",      label: "Time",      w: "100px" },
          { key: "clinician", label: "Clinician" },
          { key: "status",    label: "Status",    w: "170px", render: r => <StatusChip kind={r.status} /> },
        ]}
        rows={SAMPLE_VISITS}
        onRowClick={() => {}}
      />
    </div>
  </PageContainer>
);

// ───────── Clinicians screen ─────────
const CliniciansScreen = () => (
  <PageContainer>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
      <KpiCard label="Active today"     value="14" delta="+1"  icon="groups"       accent="var(--axle-teal)" />
      <KpiCard label="Avg match score"  value="91" delta="+2%" icon="verified"     accent="var(--axle-navy)" />
      <KpiCard label="Coverage gaps"    value="2"  delta="-1"  icon="report"       accent="var(--yellow-500)" />
    </div>

    <div style={{
      background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
      padding: 20, boxShadow: "var(--shadow-xs)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans)", flex: 1 }}>Clinician roster</div>
        <Button variant="secondary" size="sm" icon="add">Invite</Button>
      </div>
      <DashboardTable
        columns={[
          { key: "name",     label: "Clinician", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={r.name.replace("Dr. ", "")} size={32} color={`hsl(${(r.name.charCodeAt(3)*41) % 360}, 60%, 46%)`} />
              <div>
                <div style={{ fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{r.role}</div>
              </div>
            </div>
          ) },
          { key: "region",  label: "Region" },
          { key: "visits",  label: "Visits / wk", w: "120px" },
          { key: "score",   label: "Match score", w: "140px", render: r => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 60, height: 6, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" }}>
                <div style={{ width: `${r.score}%`, height: "100%", background: r.score > 90 ? "var(--green-600)" : r.score > 85 ? "var(--axle-teal)" : "var(--yellow-500)" }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{r.score}</span>
            </div>
          ) },
          { key: "active",  label: "Status", w: "120px", render: r =>
            r.active
              ? <StatusChip kind="completed" label="Active" />
              : <StatusChip kind="scheduled" label="Offline" />
          },
        ]}
        rows={SAMPLE_CLINICIANS}
        onRowClick={() => {}}
      />
    </div>
  </PageContainer>
);

Object.assign(window, { TodayScreen, VisitsScreen, CliniciansScreen });
