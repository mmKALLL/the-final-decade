import { Language } from "./types";

type Label = 'gameTitle'

export const labels: Record<Language, Record<Label, string>> = {
  "en-US": {
    gameTitle: "The Final Decade",
  },
  "jp-JP": {
    gameTitle: "最後の十年",
  },
}
