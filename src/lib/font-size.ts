export type FontSizeKey = "small" | "base" | "large";

/** 시니어 배려 글자 크기 (px) */
export const FONT_SIZES: Record<FontSizeKey, number> = {
  small: 18,
  base: 21,
  large: 24,
};

export const FONT_SIZE_STORAGE_KEY = "jongchin-font-size";

export function isFontSizeKey(v: unknown): v is FontSizeKey {
  return v === "small" || v === "base" || v === "large";
}

/** 첫 화면 깜빡임 없이 저장된 글자 크기를 적용하는 인라인 스크립트 */
export const FONT_SIZE_BOOT_SCRIPT = `try{var v=localStorage.getItem("${FONT_SIZE_STORAGE_KEY}");if(v==="small"||v==="large"){document.documentElement.setAttribute("data-font-size",v)}}catch(e){}`;
