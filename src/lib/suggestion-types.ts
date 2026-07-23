export interface WineSuggestion {
  id: string;
  name: string;
  winery: string;
  imageDataUrl?: string;
  reason: string;
  tags: string[];
}
