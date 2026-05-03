import type {CSSProperties, FC} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  companyName: string;
};

const palette = {
  bg: "#020617",
  card: "#0f172a",
  accent: "#0ea5e9",
  sub: "#38bdf8",
  text: "#e2e8f0",
};

const sectionStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "120px",
  color: palette.text,
};

export const NriConsultingIntro: FC<Props> = ({companyName}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.7,
    },
  });

  const heroOpacity = interpolate(frame, [0, 20, 110, 140], [0, 1, 1, 0], {
    easing: Easing.bezier(0.2, 0, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pointsOpacity = interpolate(frame, [120, 150, 280, 320], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endingOpacity = interpolate(frame, [300, 340, 440], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pop = interpolate(titleIn, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 20% 20%, #1e293b 0%, ${palette.bg} 60%)`,
        fontFamily: '"Inter", "Noto Sans JP", sans-serif',
      }}
    >
      <AbsoluteFill
        style={{
          ...sectionStyle,
          opacity: heroOpacity,
          transform: `scale(${pop}) translateY(${interpolate(frame, [0, 140], [20, -10])}px)`,
        }}
      >
        <p style={{fontSize: 40, letterSpacing: 3, color: palette.sub, margin: 0}}>
          COMPANY INTRODUCTION
        </p>
        <h1 style={{fontSize: 92, margin: "24px 0 12px", lineHeight: 1.1}}>
          {companyName}
        </h1>
        <p style={{fontSize: 40, opacity: 0.92, margin: 0}}>
          戦略から実行まで伴走する、価値創造のパートナー
        </p>
      </AbsoluteFill>

      <AbsoluteFill style={{...sectionStyle, opacity: pointsOpacity}}>
        <div
          style={{
            background: `linear-gradient(135deg, ${palette.card} 0%, #1e293b 100%)`,
            border: `2px solid ${palette.accent}`,
            borderRadius: 28,
            padding: "72px 80px",
            width: "78%",
            boxShadow: "0 30px 80px rgba(14, 165, 233, 0.25)",
          }}
        >
          <h2 style={{fontSize: 64, margin: 0}}>3つの強み</h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "42px 0 0",
              fontSize: 42,
              lineHeight: 1.8,
            }}
          >
            <li>1. 産業知見 × デジタルで実効性ある戦略を設計</li>
            <li>2. 業務改革・DX・組織変革を一体で推進</li>
            <li>3. データドリブンな意思決定を現場に定着</li>
          </ul>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          ...sectionStyle,
          opacity: endingOpacity,
          background:
            "linear-gradient(0deg, rgba(2, 6, 23, 0.5) 0%, rgba(2, 6, 23, 0.3) 100%)",
        }}
      >
        <p style={{fontSize: 44, color: palette.sub, margin: 0}}>未来を設計し、変革を実装する</p>
        <h2 style={{fontSize: 96, margin: "20px 0"}}>{companyName}</h2>
        <p style={{fontSize: 36, margin: 0}}>次の成長フェーズへ、ともに。</p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
