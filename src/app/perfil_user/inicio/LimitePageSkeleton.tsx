"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./LimitePage.css";

export const LimitePageSkeleton = () => {
  return (
    <section className="limite-section">
      <div style={{ marginBottom: "24px" }}>
        <Skeleton height={36} width={280} />
        <Skeleton height={16} width={240} style={{ marginTop: 8 }} />
      </div>

      <div className="limite-ui-card">
        <Skeleton height={24} width={220} style={{ margin: "0 auto" }} />
        <Skeleton height={56} width={100} style={{ margin: "0 auto" }} />
        <Skeleton height={16} width={260} style={{ margin: "0 auto" }} />
        <div className="limite-ui-opciones" style={{ marginTop: 16 }}>
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
        </div>
      </div>

      <h2 className="promos-title" style={{ marginTop: 48 }}>
        <Skeleton width={240} height={28} />
      </h2>

      <div className="promos-grid">
        {[1, 2, 3].map((_, i) => (
          <div className="promo-card-clean" key={i}>
            <Skeleton height={24} width={180} />
            <Skeleton count={2} />
            <Skeleton count={3} height={12} style={{ marginTop: 8 }} />
            <div style={{ marginTop: "auto" }}>
              <Skeleton height={16} width={120} />
              <Skeleton height={36} width={100} style={{ marginTop: 8 }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
