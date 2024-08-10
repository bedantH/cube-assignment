import { useCustomer } from "../../../contexts/AppContext";
import { ICustomer } from "../../../interfaces/customer";
import Avatar from "../avatar/Avatar";
import styles from "./customer_card.module.css";

// Customer card for the listing of customers on the left part
const CustomerCard: React.FC<{
  customer: ICustomer;
}> = ({ customer }) => {
  const { activeCustomer, setActiveCustomer } = useCustomer();

  return (
    <button
      onClick={() => {
        if (activeCustomer?.id !== customer.id) {
          setActiveCustomer(customer);
        }
      }}
      className={`${styles.customer__card} ${
        activeCustomer?.id === customer.id ? styles.active : ""
      }`}
    >
      <Avatar title={customer.name} />

      <div className={styles.customer__information}>
        <p className={styles.name}>{customer.name}</p>
        <p className={styles.title}>{customer.title}</p>
      </div>
    </button>
  );
};

export default CustomerCard;
