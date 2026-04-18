// Invisible Scheduling Partner Dashboard — shared UI kit components
// Colors & type from ../../colors_and_type.css

const { useState } = React;

// ───────────── Icons (Material Symbols) ─────────────
const Icon = ({ name, size = 20, color, weight = 400, fill = 0 }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: size,
      color,
      fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
      lineHeight: 1,
      userSelect: "none",
    }}
  >{name}</span>
);

// ───────────── Button ─────────────
const Button = ({ variant = "primary", size = "md", children, icon, onClick, disabled }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "1px solid transparent", borderRadius: 8,
    fontFamily: "var(--font-sans)", fontWeight: 600, cursor: "pointer",
    transition: "background 120ms, border-color 120ms, color 120ms, opacity 120ms",
    whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 13, lineHeight: "18px" },
    md: { padding: "8px 14px", fontSize: 14, lineHeight: "20px" },
    lg: { padding: "10px 18px", fontSize: 15, lineHeight: "22px" },
  };
  const variants = {
    primary: { background: "var(--axle-teal)", color: "#fff" },
    secondary: { background: "#fff", color: "var(--color-fg-default)", borderColor: "var(--gray-300)" },
    ghost: { background: "transparent", color: "var(--color-fg-default)" },
    danger: { background: "var(--red-600)", color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], opacity: disabled ? 0.5 : 1 }}
      onMouseEnter={e => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "var(--axle-teal-dark)";
        else if (variant === "secondary") e.currentTarget.style.background = "var(--gray-50)";
        else if (variant === "ghost") e.currentTarget.style.background = "var(--gray-100)";
      }}
      onMouseLeave={e => {
        if (variant === "primary") e.currentTarget.style.background = "var(--axle-teal)";
        else if (variant === "secondary") e.currentTarget.style.background = "#fff";
        else if (variant === "ghost") e.currentTarget.style.background = "transparent";
      }}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
};

// ───────────── StatusChip ─────────────
const STATUS = {
  completed:   { bg: "var(--green-50)",  fg: "var(--green-900)",  icon: "check_circle",     label: "Completed" },
  needs:       { bg: "var(--yellow-50)", fg: "#854708",           icon: "warning",          label: "Needs Assignment" },
  review:      { bg: "var(--blue-50)",   fg: "var(--blue-700)",   icon: "info",             label: "In Review" },
  failed:      { bg: "var(--red-50)",    fg: "var(--red-700)",    icon: "cancel",           label: "Failed" },
  scheduled:   { bg: "var(--gray-100)",  fg: "var(--gray-700)",   icon: "schedule",         label: "Scheduled" },
  enroute:     { bg: "#E0F7F5",          fg: "var(--axle-teal-dark)", icon: "directions_car", label: "En route" },
};
const StatusChip = ({ kind = "scheduled", label }) => {
  const s = STATUS[kind] ?? STATUS.scheduled;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: s.bg, color: s.fg,
      fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, lineHeight: "18px",
    }}>
      <Icon name={s.icon} size={12} color={s.fg} />
      {label ?? s.label}
    </span>
  );
};

// ───────────── Avatar ─────────────
const Avatar = ({ name = "?", size = 32, color = "var(--axle-teal)" }) => {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: "#fff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.4,
      flexShrink: 0,
    }}>{initials}</div>
  );
};

// ───────────── Sidebar ─────────────
const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 12,
    width: "100%", padding: "10px 12px",
    border: "none", borderRadius: 8,
    background: active ? "var(--axle-teal)" : "transparent",
    color: active ? "#fff" : "var(--gray-300)",
    fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: active ? 600 : 500,
    textAlign: "left", cursor: "pointer",
    transition: "background 120ms, color 120ms",
  }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; } }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-300)"; } }}
  >
    <Icon name={icon} size={20} />
    <span style={{ flex: 1 }}>{label}</span>
    {badge != null && (
      <span style={{
        background: active ? "rgba(255,255,255,0.2)" : "var(--axle-teal)",
        color: "#fff", fontSize: 11, fontWeight: 700,
        padding: "2px 6px", borderRadius: 999, minWidth: 18, textAlign: "center",
      }}>{badge}</span>
    )}
  </button>
);

const Sidebar = ({ current, onNav }) => (
  <aside style={{
    width: 248, background: "#0C525B", padding: 16,
    display: "flex", flexDirection: "column", gap: 4,
    fontFamily: "var(--font-sans)",
  }}>
    {/* Brand */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px 22px" }}>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>Invisible Scheduling</div>
    </div>

    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-400)", padding: "8px 12px 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Workspace</div>
    <SidebarItem icon="dashboard" label="Today" active={current === "today"} onClick={() => onNav("today")} />
    <SidebarItem icon="calendar_month" label="Visits" badge={12} active={current === "visits"} onClick={() => onNav("visits")} />
    <SidebarItem icon="groups" label="Clinicians" active={current === "clinicians"} onClick={() => onNav("clinicians")} />
    <SidebarItem icon="person" label="Patients" active={current === "patients"} onClick={() => onNav("patients")} />
    <SidebarItem icon="assessment" label="Reports" active={current === "reports"} onClick={() => onNav("reports")} />

    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-400)", padding: "16px 12px 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Account</div>
    <SidebarItem icon="settings" label="Settings" active={current === "settings"} onClick={() => onNav("settings")} />
    <SidebarItem icon="help" label="Support" />

    <div style={{ flex: 1 }} />
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
      <Avatar name="Rachel Cho" color="var(--axle-teal-bright)" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rachel Cho</div>
        <div style={{ color: "var(--gray-400)", fontSize: 11 }}>Admin · HQ</div>
      </div>
      <Icon name="logout" size={18} color="var(--gray-400)" />
    </div>
  </aside>
);

// ───────────── Top bar ─────────────
const TopBar = ({ title, subtitle, onAction }) => (
  <header style={{
    display: "flex", alignItems: "center", gap: 16,
    padding: "20px 32px", borderBottom: "1px solid var(--gray-200)",
    background: "#fff", fontFamily: "var(--font-sans)",
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: "var(--color-fg-default)", letterSpacing: "-0.01em" }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: "var(--color-fg-muted)", marginTop: 2 }}>{subtitle}</div>}
    </div>

    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 12px", border: "1px solid var(--gray-300)", borderRadius: 8,
      width: 280, background: "#fff",
    }}>
      <Icon name="search" size={18} color="var(--gray-500)" />
      <input placeholder="Search patients, visits…" style={{
        border: "none", outline: "none", flex: 1, fontFamily: "var(--font-sans)", fontSize: 13,
        background: "transparent", color: "var(--color-fg-default)",
      }} />
      <kbd style={{ fontSize: 10, padding: "1px 5px", border: "1px solid var(--gray-300)", borderRadius: 4, color: "var(--gray-500)", fontFamily: "var(--font-mono)" }}>⌘K</kbd>
    </div>

    <button style={{
      width: 40, height: 40, borderRadius: 10, border: "1px solid var(--gray-200)",
      background: "#fff", cursor: "pointer", position: "relative",
    }}>
      <Icon name="notifications" size={20} color="var(--gray-600)" />
      <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "var(--red-500)" }} />
    </button>
    <Button variant="primary" icon="add" onClick={onAction}>New visit</Button>
  </header>
);

// ───────────── Widget Card ─────────────
const WidgetCard = ({ label, value, delta, icon, accent = "var(--axle-teal)" }) => (
  <div style={{
    background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
    padding: 20, boxShadow: "var(--shadow-xs)",
    fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: 10, minWidth: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontSize: 13, color: "var(--color-fg-muted)", fontWeight: 500 }}>{label}</div>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: 0.12,
      }} />
      <div style={{
        position: "absolute", pointerEvents: "none",
      }}>
        {/* actual icon drawn on top */}
      </div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: "var(--color-fg-default)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
    {delta && (
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
        <Icon name={delta.startsWith("+") ? "trending_up" : "trending_down"} size={14} color={delta.startsWith("+") ? "var(--green-700)" : "var(--red-600)"} />
        <span style={{ color: delta.startsWith("+") ? "var(--green-700)" : "var(--red-600)", fontWeight: 600 }}>{delta}</span>
        <span style={{ color: "var(--color-fg-muted)" }}>vs. last week</span>
      </div>
    )}
  </div>
);

// Simpler cleaner widget card
const KpiCard = ({ label, value, delta, icon, accent = "var(--axle-teal)" }) => (
  <div style={{
    background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
    padding: 20, boxShadow: "var(--shadow-xs)",
    fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column", gap: 12, minWidth: 0,
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{ fontSize: 13, color: "var(--color-fg-muted)", fontWeight: 500 }}>{label}</div>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `color-mix(in oklab, ${accent} 14%, white)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={20} color={accent} />
      </div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: "var(--color-fg-default)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
    {delta && (
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
        <Icon name={delta.startsWith("+") ? "trending_up" : "trending_down"} size={14} color={delta.startsWith("+") ? "var(--green-700)" : "var(--red-600)"} />
        <span style={{ color: delta.startsWith("+") ? "var(--green-700)" : "var(--red-600)", fontWeight: 600 }}>{delta}</span>
        <span style={{ color: "var(--color-fg-muted)" }}>vs. last week</span>
      </div>
    )}
  </div>
);

// ───────────── Alert ─────────────
const Alert = ({ kind = "info", title, body, onClose }) => {
  const s = {
    info:    { bg: "var(--blue-50)",   border: "var(--blue-200)",   fg: "var(--blue-700)",  icon: "info" },
    success: { bg: "var(--green-50)",  border: "var(--green-200)",  fg: "var(--green-800)", icon: "check_circle" },
    warning: { bg: "var(--yellow-50)", border: "var(--yellow-200)", fg: "#854708",          icon: "warning" },
    error:   { bg: "var(--red-50)",    border: "var(--red-200)",    fg: "var(--red-700)",   icon: "error" },
  }[kind];
  return (
    <div style={{
      display: "flex", gap: 12, padding: 14,
      background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10,
      fontFamily: "var(--font-sans)",
    }}>
      <Icon name={s.icon} size={20} color={s.fg} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 600, color: s.fg, fontSize: 14 }}>{title}</div>}
        {body && <div style={{ color: s.fg, opacity: 0.9, fontSize: 13, marginTop: title ? 2 : 0 }}>{body}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", color: s.fg, padding: 0 }}>
          <Icon name="close" size={18} color={s.fg} />
        </button>
      )}
    </div>
  );
};

// ───────────── Dashboard Table ─────────────
const DashboardTable = ({ columns, rows, onRowClick }) => (
  <div style={{
    background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12,
    overflow: "hidden", fontFamily: "var(--font-sans)", boxShadow: "var(--shadow-xs)",
  }}>
    <div style={{
      display: "grid", gridTemplateColumns: columns.map(c => c.w || "1fr").join(" "),
      background: "var(--gray-50)", borderBottom: "1px solid var(--gray-200)",
      padding: "10px 16px", gap: 16,
      fontSize: 11, fontWeight: 600, color: "var(--gray-600)",
      textTransform: "uppercase", letterSpacing: "0.04em",
    }}>
      {columns.map(c => <div key={c.key}>{c.label}</div>)}
    </div>
    {rows.map((r, i) => (
      <div
        key={r.id || i}
        onClick={() => onRowClick?.(r)}
        style={{
          display: "grid", gridTemplateColumns: columns.map(c => c.w || "1fr").join(" "),
          padding: "14px 16px", gap: 16,
          borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--gray-200)",
          cursor: onRowClick ? "pointer" : "default",
          fontSize: 13, color: "var(--color-fg-default)",
          alignItems: "center", transition: "background 120ms",
        }}
        onMouseEnter={e => onRowClick && (e.currentTarget.style.background = "var(--gray-50)")}
        onMouseLeave={e => onRowClick && (e.currentTarget.style.background = "#fff")}
      >
        {columns.map(c => <div key={c.key} style={{ minWidth: 0 }}>{c.render ? c.render(r) : r[c.key]}</div>)}
      </div>
    ))}
  </div>
);

// ───────────── Page Container ─────────────
const PageContainer = ({ children }) => (
  <div style={{ padding: 32, background: "var(--gray-50)", flex: 1, overflow: "auto" }}>{children}</div>
);

// ───────────── Tabs ─────────────
const Tabs = ({ items, current, onChange }) => (
  <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--gray-200)", marginBottom: 24 }}>
    {items.map(t => (
      <button key={t.key}
        onClick={() => onChange(t.key)}
        style={{
          padding: "10px 14px", border: "none", background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: 14,
          fontWeight: current === t.key ? 600 : 500,
          color: current === t.key ? "var(--axle-teal-dark)" : "var(--color-fg-muted)",
          borderBottom: `2px solid ${current === t.key ? "var(--axle-teal)" : "transparent"}`,
          marginBottom: -1, cursor: "pointer",
        }}>
        {t.label}
        {t.count != null && (
          <span style={{
            marginLeft: 6, padding: "1px 7px", borderRadius: 999,
            background: current === t.key ? "var(--axle-teal-bright)" : "var(--gray-100)",
            color: current === t.key ? "var(--axle-teal-dark)" : "var(--gray-600)",
            fontSize: 11, fontWeight: 700,
          }}>{t.count}</span>
        )}
      </button>
    ))}
  </div>
);

Object.assign(window, { Icon, Button, StatusChip, Avatar, Sidebar, TopBar, KpiCard, Alert, DashboardTable, PageContainer, Tabs });
