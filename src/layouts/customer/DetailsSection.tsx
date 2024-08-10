import { useEffect, useState } from "react";
import Avatar from "../../components/common/avatar/Avatar";
import { useCustomer } from "../../contexts/AppContext";
import customer from "./customer.module.css";

interface IImage {
  id: string;
  download_url: string;
}

const DetailsSection: React.FC = () => {
  const { activeCustomer } = useCustomer();
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchImages = async (nextPage: number) => {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${nextPage}&limit=9`
    );
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages(page);

    const interval = setInterval(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchImages(nextPage);
        return nextPage;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {activeCustomer ? (
        <section className={customer.details}>
          <Avatar size={120} title={activeCustomer?.name} />
          <p className={customer.details_name}>{activeCustomer?.name}</p>
          <p className={customer.details_title}>{activeCustomer?.title}</p>
          <p className={customer.details_address}>{activeCustomer?.address}</p>

          <div className={customer.images}>
            {images?.map((img) => (
              <img key={img.id} src={img.download_url} alt={img.id} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default DetailsSection;
