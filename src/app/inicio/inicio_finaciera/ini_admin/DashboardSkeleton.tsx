"use client";

import "./DashboardSkeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Panel de Control</h2>
      <p className="dashboard-subtitle">
        podrás ver tu tendencia de préstamos obtenidos a tiempo real
      </p>

      <div className="skeleton-top-row">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>

      <div className="skeleton-graph-section">
        <div className="skeleton-graph" />
        <div className="skeleton-side-column">
          <div className="skeleton-side-box" />
          <div className="skeleton-side-box" />
          <div className="skeleton-side-box" />
        </div>
      </div>
    </div>
  );
}
