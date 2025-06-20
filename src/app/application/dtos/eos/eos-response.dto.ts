import { ConfigEos } from "./config-eos"
import { ConnectionMetaData } from "./connection-meta-data.dto"

export class EosResponseDto {
  connectionMetadata: ConnectionMetaData
  config: ConfigEos
}

