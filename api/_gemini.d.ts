export interface GeminiPart {
    text: string;
}
export interface GeminiContent {
    role: "user" | "model";
    parts: GeminiPart[];
}
export interface GeminiRequestBody {
    systemInstruction?: string;
    contents: GeminiContent[];
    temperature?: number;
    responseMimeType?: "text/plain" | "application/json";
}
export interface GeminiResult {
    ok: boolean;
    status: number;
    text?: string;
    error?: string;
}
export declare function callGemini(body: GeminiRequestBody): Promise<GeminiResult>;
