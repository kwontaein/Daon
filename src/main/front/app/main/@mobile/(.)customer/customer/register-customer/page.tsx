import { getAffiliation } from '@/features/customer/affiliation/api/server-api';
import { getEmployeeApi } from '@/features/staff/employee/api/server-api';
import CustomerForm from '@/components/main/customer/form/customer-form';
import MobileModal from '@/components/share/mobile-modal/page';

export default async function RegisterCustomer() {
  const affiliation = await getAffiliation();
  const employees = await getEmployeeApi();

  return (
    <MobileModal >
    <CustomerForm
        affiliation={affiliation}
        employees={employees}
        mode="write"
        isMobile={true}/>    
    </MobileModal>
  );
}