import React, { useState, useEffect, useRef, useCallback } from "react";
import { ICustomer } from "../../../interfaces/customer";
import { customers } from "../../../content/customers";
import CustomerCard from "../customer-card/CustomerCard";
import Skeleton from "../skeleton/Skeleton";

/*
  This component handles large count of customers to be rendered  (as per the case 1000)
   - Currently using dummy data for 30 records to simulate the same, however this can
     be implemented using APIs and using libraries like tanstack query (these just make the work a bit easier) 
  
   - page size is predefined, 10

   - whenever the user scrolls to the bottom there's a ref attached to the bottom most card
     triggers the lastItemRef which changes the page and the new item are added to the items list
*/
const InfiniteScroll = () => {
  const [items, setItems] = useState<ICustomer[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const initialItems = customers.slice(0, 10);
    setItems(initialItems);

    if (initialItems.length < 10) {
      setHasMore(false);
    }
  }, []);

  const loadMoreItems = useCallback(() => {
    if (!hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newItems = customers.slice(page * 10, (page + 1) * 10);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }

      setLoading(false);
    }, 1000);
  }, [page, hasMore]);

  useEffect(() => {
    if (page === 1) return;

    loadMoreItems();
  }, [page, loadMoreItems]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      {items.map((item, index) => {
        if (items.length === index + 1) {
          return (
            <div ref={lastItemRef} key={index}>
              <CustomerCard customer={item} />
            </div>
          );
        } else {
          return <CustomerCard key={index} customer={item} />;
        }
      })}
      {loading && <Skeleton />}
    </div>
  );
};

export default InfiniteScroll;
