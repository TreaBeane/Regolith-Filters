"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.getFontChoice = exports.FontContext = exports.getFont = exports.scanFontChoice = void 0;
var Jimp = require("jimp");
var fs = require("fs");
function scanFontChoice() {
    return __awaiter(this, void 0, void 0, function () {
        var fontAssetsExist, regular, bold, italic, boldAndItalic;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fontAssetsExist = fs.existsSync('data/create_holograms/assets/fonts');
                    if (!fontAssetsExist) {
                        console.error('Failed to find font assets. Make sure you properly setup filter!');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Jimp.loadFont(getFont("white_minecraft"))];
                case 1:
                    regular = _a.sent();
                    return [4 /*yield*/, Jimp.loadFont(getFont("white_minecraft_bold"))];
                case 2:
                    bold = _a.sent();
                    return [4 /*yield*/, Jimp.loadFont(getFont("white_minecraft_italic"))];
                case 3:
                    italic = _a.sent();
                    return [4 /*yield*/, Jimp.loadFont(getFont("white_minecraft_bold_italic"))];
                case 4:
                    boldAndItalic = _a.sent();
                    return [2 /*return*/, new FontContext(regular, bold, boldAndItalic, italic)];
            }
        });
    });
}
exports.scanFontChoice = scanFontChoice;
function getFont(font) {
    return "data/create_holograms/assets/fonts/".concat(font, "/font.fnt");
}
exports.getFont = getFont;
var FontContext = /** @class */ (function () {
    function FontContext(regular, bold, boldItalic, italic) {
        this.regular = regular;
        this.bold = bold;
        this.boldItalic = boldItalic;
        this.italic = italic;
    }
    return FontContext;
}());
exports.FontContext = FontContext;
function getFontChoice(fonts, bold, italic) {
    if (bold && !italic) {
        return fonts.bold;
    }
    else if (bold && italic) {
        return fonts.boldItalic;
    }
    else if (!bold && italic) {
        return fonts.italic;
    }
    else {
        return fonts.regular;
    }
}
exports.getFontChoice = getFontChoice;
