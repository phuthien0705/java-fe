export const sortOrdersByDate = (orders: any[]) => {
  if (!orders || orders?.length === 0) return [];
  return orders.sort(function (a: any, b: any) {
    let dateA = new Date(a.updated_at).getTime();
    let dateB = new Date(b.updated_at).getTime();
    return dateA > dateB ? 1 : -1;
  });
};
