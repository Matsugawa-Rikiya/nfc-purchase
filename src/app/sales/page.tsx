import CustomerCard from "../components/sales/CustomerCard";
import EmployeeCard from "../components/sales/EmployeeCard";

export default function Sales() {
  return (
    <div className="container mx-auto flex">
      <EmployeeCard />
      <CustomerCard />
    </div>
  );
}
