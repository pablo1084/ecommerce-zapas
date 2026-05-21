const AdminTableSkeleton = () => {
  return (
    <div className="admin-table-skeleton">

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="admin-skeleton-row"
        >
          <div className="skeleton-cell large"></div>

          <div className="skeleton-cell"></div>

          <div className="skeleton-cell"></div>

          <div className="skeleton-cell"></div>

          <div className="skeleton-cell badge"></div>

          <div className="skeleton-cell buttons"></div>
        </div>
      ))}

    </div>
  );
};

export default AdminTableSkeleton;