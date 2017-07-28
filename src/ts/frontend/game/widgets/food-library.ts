/// <reference path="./food.ts" />

namespace foodLibrary {
    export const easy = [
        "PCRTT",
        "PCRRT",
        "PCRTT",
        "PCRTPCRT",
        "PCRTPCRT",
        "PCRTPCRT",
        "PCRTPCRT",
        "PCRRTPCRT",
        "PCRTPCRCRCRT",
        "PCRTPCRCRCRT"
    ];
    export const normal = [
        "PCRRT",
        "PCRCRT",
        "PPCRTPCRT",
        "PCRTPCRRT",
        "PCRRTPCRT",
        "PPCRTPCRT",
        "PCRTPCRRT",
        "PCRTTPCRTT",
        "PRTPRTPRRT",
        "PCRTTPCRTT",
        "TRCRRCRCRT",
        "PCRTPCRTPCRRT",
        "PCRTPCRRTPCRT",
        "PCRTPCRTRPCRT"
    ];
    export const hard = [
        "PCRCRT",
        "PCRTPCRCRT",
        "PCRCRTPCRT",
        "PCRTTPCRTT",
        "PRTPRTPRRT",
        "PCRTTPCRTT",
        "TRCRRCRCRT",
        "PCRTPCRCRT",
        "PCRCRTPCRT",
        "PCRTPCRTPCRRT",
        "PCRTPCRTPCRRT",
        "PCRTPCRRTPCRT",
        "PCRTPCRTRPCRT",
        "PCRTPCRTPCRRT",
        "PCRCRPCRPCRPCRPCR",
        "PCRCRPCRPCRPCRPCR"
    ]
    function ChrToPart(c: string): food.Part {
        switch (c) {
            case "P": return food.Part.PROM;
            case "C": return food.Part.CDS;
            case "R": return food.Part.RBS;
            case "T": return food.Part.TERM;
            default: throw `ChrToPart: Invalid Character '${c}'`;
        }
    }
    export function StrToParts(s: string): food.Part[] {
        return s.split("").map(ChrToPart);
    }
    export function StrsToPartLib(ss: string[]): food.Part[][] {
        return ss.map(StrToParts);
    }
}