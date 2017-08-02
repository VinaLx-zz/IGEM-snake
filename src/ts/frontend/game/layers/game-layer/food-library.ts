/// <reference path="../../widgets/food.ts" />
/// <reference path="./level.ts" />

namespace foodLibrary {
    export const easy = [
		"PRCT",
        "PRCTT",
        "PRCCT",
		"PPRCT"
    ];
    export const normal = [
		"PRCRCT",
        "PPRCTT",
        "PCTPRCT",
        "PRCTPRCT"
    ];
    export const hard = [
        "PPRCTPRCT",
        "PRCTPRCCT",
        "PRCPRCTPCT",
        "PRRCTPRCTT",
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
    export function LevelLibrary(l: Level): food.Part[][] {
        switch (l) {
            case Level.Easy: return StrsToPartLib(easy);
            case Level.Normal: return StrsToPartLib(normal);
            case Level.Hard: return StrsToPartLib(hard);
        }
    }
}