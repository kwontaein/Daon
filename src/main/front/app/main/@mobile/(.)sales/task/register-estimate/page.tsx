import EstimateHeader from "@/components/main/sales/estimate/form/estimate-header"
import {getCompany} from "@/features/staff/company/api/server-api"
import { getTaskApi } from "@/features/sales/task/api/server-api"
import { ResponseCompany } from "@/model/types/staff/company/type"
import { EstimateRegisterProps } from "@/model/types/sales/estimate/type"
import { ResponseTask } from "@/model/types/sales/task/type"
import { getUserInfo } from "@/features/user/userApi"
import MobileModal from "@/components/share/mobile-modal/page"

export default async function RegisterTaskEstimatePage({searchParams}:EstimateRegisterProps){
    const taskId = (await searchParams).taskId ||''

    const companyList:ResponseCompany[] = await getCompany()
    const task:ResponseTask =await getTaskApi(taskId)
    const userInfo = await getUserInfo()

    return(
        <MobileModal height="550px">
            <EstimateHeader
                companyList={companyList}
                task={task}
                mode='write'
                userInfo={userInfo}
                isMobile={true}/>
        </MobileModal>
    )
}