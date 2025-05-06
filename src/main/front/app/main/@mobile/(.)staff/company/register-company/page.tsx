import CompanyForm from "@/components/main/staff/company/form/company-form";
import MobileModal from "@/components/share/mobile-modal/page";

export default function RegisterCompany(){
    return(
        <MobileModal >
            <CompanyForm isMobile={true}/>
        </MobileModal>
    )
}