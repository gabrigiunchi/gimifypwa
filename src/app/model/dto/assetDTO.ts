import {AssetKind} from '../entities/asset-kind';

export interface AssetDTO {
  id: number;
  name: string;
  gymId: number;
  gymName: string;
  kind: AssetKind;
}
