import InfiniteScroll from "../../components/common/infinite-scroll/InfiniteScroll";
import Layout from "../../components/common/root-layout/Layout";
import { useCustomer } from "../../contexts/AppContext";
import customer from "./customer.module.css";
import DetailsSection from "./DetailsSection";

const CustomerLayout: React.FC = () => {
  const { activeCustomer } = useCustomer();

  return (
    <Layout title="Customers">
      <section className={customer.listing__wrapper}>
        <section className={customer.listing}>
          <InfiniteScroll />
        </section>
        {activeCustomer && <DetailsSection key={activeCustomer?.id} />}
      </section>
    </Layout>
  );
};

export default CustomerLayout;
