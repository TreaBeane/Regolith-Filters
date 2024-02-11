import * as Jimp from "jimp";
import { Font } from "@jimp/plugin-print";
import * as fs from 'fs';

export async function scanFontChoice() {
    const fontAssetsExist = fs.existsSync('data/create_recipe_board_image/assets/fonts');

    if (!fontAssetsExist){
        console.error('Failed to find font assets. Make sure you properly setup filter!');
        return;
    }

    const regular = await Jimp.loadFont(getFont("white_minecraft"));
    const bold = await Jimp.loadFont(getFont("white_minecraft_bold"));
    const italic = await Jimp.loadFont(getFont("white_minecraft_italic"));
    const boldAndItalic = await Jimp.loadFont(getFont("white_minecraft_bold_italic"));

    return new FontContext(regular, bold, boldAndItalic, italic) as FontContext;
}

export function getFont(font: string) {
    return `data/create_recipe_board_image/assets/fonts/${font}/font.fnt`;
}

export class FontContext {
    regular: Font;
    bold: Font;
    boldItalic: Font;
    italic: Font;

    constructor(regular: Font, bold: Font, boldItalic: Font, italic: Font) {
        this.regular = regular;
        this.bold = bold;
        this.boldItalic = boldItalic;
        this.italic = italic;
    }
}

export function getFontChoice(fonts: FontContext, bold: boolean, italic: boolean): Font {
    if (bold && !italic){
        return fonts.bold;
    }else if (bold && italic){
        return fonts.boldItalic;
    }else if (!bold && italic){
        return fonts.italic;
    }else {
        return fonts.regular;
    }
}