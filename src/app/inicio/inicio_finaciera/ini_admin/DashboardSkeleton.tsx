"use client";

import "./DashboardSkeleton.css";

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-page">
      <div className="skeleton-header">
        <div className="skeleton-title shimmer" />
        <div className="skeleton-subtitle shimmer" />
      </div>

      <div className="skeleton-top-row">
        <div className="skeleton-card shimmer" />
        <div className="skeleton-card shimmer" />
        <div className="skeleton-card shimmer" />
      </div>

      <div className="skeleton-graph-section">
        <div className="skeleton-graph shimmer" />
        <div className="skeleton-side-column">
          <div className="skeleton-side-box shimmer" />
          <div className="skeleton-side-box shimmer" />
          <div className="skeleton-side-box shimmer" />
        </div>
      </div>
    </div>
  );
}
