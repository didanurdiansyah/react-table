export default function Table({ result, setLimit, setPage, page, totalPage }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Product Code</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Tags</th>
          </tr>
        </thead>
        <tbody>
          {result &&
            result?.map((e, index) => {
              const { title, description, footer, category, tags } = e || {};
              return (
                <>
                  <tr key={index}>
                    <td>{title || "-"}</td>
                    <td>{footer || "-"}</td>
                    <td>{category || "-"}</td>
                    <td>{description || "-"}</td>
                    <td>
                      <ul className="tags">
                        {tags && tags?.map((i) => <li>{i || "-"}</li>)}
                      </ul>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
              className="page-item"
            >
              <a className="page-link" href="#">
                ◀
              </a>
            </li>
            {totalPage &&
              totalPage.map((e, index) => {
                return (
                  <li
                    onClick={() => {
                      setPage(index + 1);
                    }}
                    className={`page-item ${
                      index + 1 === page ? "active" : ""
                    }`}
                  >
                    <a className="page-link" href="#">
                      {e}
                    </a>
                  </li>
                );
              })}
            <li
              onClick={() => {
                if (page < totalPage.length) {
                  setPage(page + 1);
                }
              }}
              className="page-item"
            >
              <a className="page-link" href="#">
                ▶
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <div className="row">
            <div className="col pt-1 text-primary">show</div>
            <div className="col">
              <select
                onChange={(e) => {
                  const v = e.target.value;
                  setLimit(v);
                  setPage(1);
                }}
                className="form-select"
                style={{ width: "80px" }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
