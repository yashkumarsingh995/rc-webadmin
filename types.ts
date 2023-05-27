import { RaRecord } from "react-admin"
export interface Report extends RaRecord {
  report_type: string
  report_name: string
}
