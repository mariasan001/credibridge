"use client";

import Image from "next/image";

interface Props {
  darkMode: boolean;
}

export function LoginIllustration({ darkMode }: Props) {
  return (
    <div className="login-image-section">
      <Image
        src={darkMode ? "/img/img3-oscuro.png" : "/img/img3.png"}
        alt="CrediBridge ilustración"
        fill
        className="login-image-fill"
        sizes="(min-width: 768px) 50vw, 100vw" // 🧠 Esto ayuda a Next a optimizar
        priority={false} // ❌ No la forzamos como prioridad
      />
    </div>
  );
}
