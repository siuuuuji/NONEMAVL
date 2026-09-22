var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DEFAULT_MODEL = "gemini-flash-latest";
export function callGemini(body) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, model, url, payload, res, _a, json, _b, candidate, finishReason, text;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    apiKey = process.env.GEMINI_API_KEY;
                    if (!apiKey) {
                        return [2 /*return*/, { ok: false, status: 500, error: "서버에 GEMINI_API_KEY가 설정되어 있지 않아요." }];
                    }
                    if (!Array.isArray(body === null || body === void 0 ? void 0 : body.contents) || body.contents.length === 0) {
                        return [2 /*return*/, { ok: false, status: 400, error: "대화 내용이 비어 있어요." }];
                    }
                    model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
                    url = "https://generativelanguage.googleapis.com/v1beta/models/".concat(model, ":generateContent?key=").concat(apiKey);
                    payload = {
                        contents: body.contents,
                        generationConfig: __assign({ temperature: (_c = body.temperature) !== null && _c !== void 0 ? _c : 0.6 }, (body.responseMimeType ? { responseMimeType: body.responseMimeType } : {}))
                    };
                    if (body.systemInstruction) {
                        payload.systemInstruction = { parts: [{ text: body.systemInstruction }] };
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    res = _g.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _g.sent();
                    return [2 /*return*/, { ok: false, status: 502, error: "AI 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요." }];
                case 4:
                    json = null;
                    _g.label = 5;
                case 5:
                    _g.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, res.json()];
                case 6:
                    json = _g.sent();
                    return [3 /*break*/, 8];
                case 7:
                    _b = _g.sent();
                    return [2 /*return*/, { ok: false, status: 502, error: "AI 응답을 읽지 못했어요." }];
                case 8:
                    if (!res.ok) {
                        return [2 /*return*/, { ok: false, status: res.status, error: ((_d = json === null || json === void 0 ? void 0 : json.error) === null || _d === void 0 ? void 0 : _d.message) || "AI 응답 생성에 실패했어요." }];
                    }
                    candidate = (_e = json === null || json === void 0 ? void 0 : json.candidates) === null || _e === void 0 ? void 0 : _e[0];
                    finishReason = candidate === null || candidate === void 0 ? void 0 : candidate.finishReason;
                    text = (((_f = candidate === null || candidate === void 0 ? void 0 : candidate.content) === null || _f === void 0 ? void 0 : _f.parts) || [])
                        .map(function (p) { return (p === null || p === void 0 ? void 0 : p.text) || ""; })
                        .join("");
                    if (!text) {
                        if (finishReason === "SAFETY") {
                            return [2 /*return*/, { ok: false, status: 422, error: "안전 정책으로 응답이 차단됐어요." }];
                        }
                        return [2 /*return*/, { ok: false, status: 502, error: "AI가 빈 응답을 반환했어요." }];
                    }
                    return [2 /*return*/, { ok: true, status: 200, text: text }];
            }
        });
    });
}
