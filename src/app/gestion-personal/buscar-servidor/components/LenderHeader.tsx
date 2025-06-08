import { LenderSearchResponse } from "../model/lender_search_model"
import { LaborInfoCard } from "./LaborInfoCard"
import { PersonalInfoCard } from "./PersonalInfoCard"
import { UserInfoCard } from "./UserInfoCard"
import "./LenderHeader.css"

interface Props {
  data: LenderSearchResponse
}

export function LenderHeader({ data }: Props) {
  return (
    <div className="lender-header-container">
      <div className="column">
        <UserInfoCard user={data.user} />
      </div>
      <div className="column wide">
        <PersonalInfoCard data={data} />
      </div>
      <div className="column wide">
        <LaborInfoCard data={data} />
      </div>
    </div>
  )
}
