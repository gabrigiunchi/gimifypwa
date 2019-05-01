import {Gym} from './gym';
import {AssetKind} from './asset-kind';

export interface Asset {
    id: number;
    name: string;
    gym: Gym;
    kind: AssetKind;
}
