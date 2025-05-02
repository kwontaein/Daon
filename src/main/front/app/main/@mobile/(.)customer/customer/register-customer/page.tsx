import { getAffiliation } from '@/features/customer/affiliation/api/customerCateApi';
import { getEmployeeApi } from '@/features/staff/employee/api/employeeApi';
import CustomerForm from '@/components/main/customer/form/customer-form';
import MobileModal from '@/components/share/mobile-modal/page';

export default async function RegisterCustomer() {
  const affiliation = await getAffiliation();
  const employees = await getEmployeeApi();

  return (
    <MobileModal height='fit-content'>
      <CustomerForm affiliation={affiliation} employees={employees} mode="write" />
    </MobileModal>
  );
}