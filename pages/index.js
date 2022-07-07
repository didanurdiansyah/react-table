// import Head from "next/head";
import { useState, useEffect } from "react";
import SideBar from "../src/components/sidebar";
import Table from "../src/components/table";

export default function Home() {
  const [menu, setMenu] = useState({ question_one: true, question_two: false });
  const [headerTitle, setHeaderTitle] = useState("Question 1");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [limit, setLimit] = useState(10);

  const [isLoading, setIsLoaded] = useState(false);

  const [error, setError] = useState([]);

  const pageParse = (page, limit, result) => {
    let res = [];
    for (let i = (page - 1) * limit; i < page * limit; i++) {
      if (result[i]) {
        res.push(result[i]);
      }
    }
    return res;
  };

  const getDataQuestion = async (path) => {
    setIsLoaded(true);
    await fetch("https://screening.moduit.id/frontend/web/question/" + path)
      .then((res) => res.json())
      .then(
        (result) => {
          const total_page = Math.ceil(result.length / 10);
          setTotalPage(Array.from({ length: total_page }, (_, i) => i + 1));
          const data = pageParse(1, 10, result);
          setData(data);
          setResult(result);
          setPage(1);
          setLimit(10);
          setIsLoaded(false);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  };

  useEffect(() => {
    getDataQuestion("one");
  }, []);

  useEffect(() => {
    const data = pageParse(page, limit, result);
    setData(data);
    const total_page = Math.ceil(result.length / limit);
    setTotalPage(Array.from({ length: total_page }, (_, i) => i + 1));
  }, [page, limit]);

  // console.error("error", error);

  return (
    <>
      <div className="d-flex">
        <SideBar
          setMenu={setMenu}
          setHeaderTitle={setHeaderTitle}
          getDataQuestion={getDataQuestion}
          menu={menu}
        />
        <div className="p-3" style={{ width: "100%" }}>
          <div className="p-3">
            <h3 className="mb-4">{headerTitle}</h3>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
              <div className="mt-4">
                <Table
                  result={data}
                  totalPage={totalPage}
                  setLimit={setLimit}
                  setPage={setPage}
                  page={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
