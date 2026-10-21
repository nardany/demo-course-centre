const NATIVE: Record<string, string> = {
  EN: "English",
  DE: "Deutsch",
  FR: "Français",
  ES: "Español",
  ZH: "中文",
  RU: "Русский",
  IT: "Italiano",
  HY: "Հայերեն",
  JA: "日本語",
  KO: "한국어",
  AR: "العربية",
  FA: "فارسی",
  TR: "Türkçe",
  PT: "Português",
};

export function nativeName(code: string) {
  return NATIVE[code.trim().toUpperCase()] ?? "";
}
