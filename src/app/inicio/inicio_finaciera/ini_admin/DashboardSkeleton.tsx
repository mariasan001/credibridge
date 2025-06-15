
"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import "./DashboardSkeleton.css";

export default function DashboardSkeletonPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageLayout>
      <div className="dashboard-page1">
        <h2 className="dashboard-title">Panel de Control</h2>
        <p className="dashboard-subtitle">
          podrás ver tu tendencia de préstamos obtenidos a tiempo real
        </p>

        {loading && (
          <div className="dashboard-skeleton">
            <div className="skeleton-row">
              <div className="skeleton-box" style={{ width: "30%", height: 80 }}></div>
              <div className="skeleton-box" style={{ width: "30%", height: 80 }}></div>
              <div className="skeleton-box" style={{ width: "30%", height: 80 }}></div>
            </div>

            <div className="skeleton-chart" style={{ height: 300, marginTop: 32 }}></div>

            <div
              className="skeleton-side-boxes"
              style={{ display: "flex", gap: 16, marginTop: 32 }}
            >
              <div className="skeleton-box" style={{ width: 140, height: 100 }}></div>
              <div className="skeleton-box" style={{ width: 140, height: 100 }}></div>
              <div className="skeleton-box" style={{ width: 140, height: 100 }}></div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
