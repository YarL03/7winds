import { IRow } from "./Row.interface";

export interface ITreeRow extends IRow {
    child: Array<ITreeRow>
}