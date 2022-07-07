export default function Home({
  setMenu,
  setHeaderTitle,
  menu,
  getDataQuestion,
}) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 shadow-lg"
      style={{ width: "300px", height: "inital" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <img src="/logo.svg" />
      </a>
      <ul
        className="nav nav-pills flex-column mb-auto"
        style={{ marginTop: "80px" }}
      >
        <li className="nav-item">
          <a
            onClick={() => {
              setHeaderTitle("Question 1");
              setMenu({ question_one: true, question_two: false });
              getDataQuestion("one");
            }}
            className={`nav-link ${menu?.question_one ? "active" : ""}`}
          >
            <span>?</span>
            Question 1
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => {
              setHeaderTitle("Question 2");
              setMenu({ question_one: false, question_two: true });
              getDataQuestion("two");
            }}
            className={`nav-link ${menu?.question_two ? "active" : ""}`}
          >
            <span>??</span>
            Question 2
          </a>
        </li>
      </ul>
    </div>
  );
}
