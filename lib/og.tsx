import { ImageResponse } from "next/og";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const INK = "#2E2019";
const PAPER = "#FBF7F4";
const ORANGE = "#F36716";
const MUTED = "#7E6658";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface Font {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: "normal" | "italic";
}

let fontPromise: Promise<Font[]> | null = null;

function fetchFonts(): Promise<Font[]> {
  if (fontPromise) return fontPromise;

  fontPromise = (async () => {
    const fonts: Font[] = [];
    const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)";

    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap",
        { headers: { "User-Agent": ua } }
      ).then((r) => r.text());
      const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
      if (url) {
        fonts.push({
          name: "Bricolage",
          data: await fetch(url).then((r) => r.arrayBuffer()),
          weight: 800,
          style: "normal",
        });
      }
    } catch {
      /* fall back to default font */
    }

    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap",
        { headers: { "User-Agent": ua } }
      ).then((r) => r.text());
      const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
      if (url) {
        fonts.push({
          name: "InstrumentSerif",
          data: await fetch(url).then((r) => r.arrayBuffer()),
          weight: 400,
          style: "italic",
        });
      }
    } catch {
      /* fall back to default font */
    }

    return fonts;
  })();

  return fontPromise;
}

interface OgOptions {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  meta?: string;
}

export async function ogImage({ eyebrow, title, accent, subtitle, meta }: OgOptions) {
  const fonts = await fetchFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: 56,
          border: `10px solid ${INK}`,
          fontFamily: "Bricolage, sans-serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 18, height: 18, background: ORANGE }} />
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: INK,
              }}
            >
              {eyebrow}
            </div>
          </div>
          {meta ? (
            <div
              style={{
                fontSize: 22,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        {/* title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -3,
              color: INK,
            }}
          >
            {title}
          </div>
          {accent ? (
            <div
              style={{
                fontFamily: "InstrumentSerif, serif",
                fontStyle: "italic",
                fontSize: 96,
                lineHeight: 1,
                color: ORANGE,
              }}
            >
              {accent}
            </div>
          ) : null}
        </div>

        {/* bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {subtitle ? (
            <div style={{ fontSize: 30, color: MUTED, maxWidth: 780 }}>{subtitle}</div>
          ) : (
            <div />
          )}
          <div style={{ width: 104, height: 104, background: ORANGE }} />
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      ...(fonts.length ? { fonts } : {}),
    }
  );
}
