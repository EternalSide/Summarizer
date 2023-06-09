import { useState, useEffect, useRef } from "react";
import { loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import Example from "./Example";

const Main = () => {
  //Дефолтный ответ отдает Линк на статью и результат.
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [translate, setTranslate] = useState(false);
  //RTQ Query получаем результат выжимки из статьи
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  //Cкопировано? Меняем кнопку.
  const [copied, setCopied] = useState("");

  //Развернем localstorage при заходе  на главную, если пользователь отправлял запросы.
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const inputRef = useRef();
  //Submit формы + запись в localstorage и разворот
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      setTranslate(true);
      // Сделать перевод
      const url = "https://google-translate105.p.rapidapi.com/v1/rapid/translate";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "efaa4c86b7msh6c4c20b500d2eb6p115af6jsn55cff6c704f8",
          "X-RapidAPI-Host": "google-translate105.p.rapidapi.com",
        },
        body: new URLSearchParams({
          text: data.summary,
          to_lang: "ru",
          from_lang: "en",
        }),
      };

      fetch(url, options)
        .then((data) => data.json())
        .then((data) => {
          // Ссылка уже записана через Input, здесь записываем результат
          const newArticle = { ...article, summary: data.translated_text };
          //Все запросы обновленные
          const updatedAllArticles = [newArticle, ...allArticles];
          setAllArticles(updatedAllArticles);
          setArticle(newArticle);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          inputRef.current.value = "";
          setTranslate(false);
        });
    }
  };
  //Скопировать по кнопке copy
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Поиск */}
      <div className="flex flex-col w-full gap-3">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Введите URL"
            // Развернем артикль для отправки запроса
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
            ref={inputRef}
          />

          <button type="submit" className="submit_btn">
            <SendIcon />
          </button>
        </form>
        <h2 className="text-gray-300 font-inter font-medium text-sm">Время на формирование результата занимает приблизительно 5-20с.</h2>

        <div className="flex flex-col gap-2 overflow-y-auto mt-6">
          <h2 className="font-satoshi font-bold text-white text-xl">
            {allArticles.length !== 0 && <span className="blue_gradient">Сохраненное:</span>}
          </h2>
          {allArticles.map((item, index) => {
            return (
              <div
                className="link_card"
                key={`link-${index}`}
                onClick={() => {
                  setArticle(item);
                }}
              >
                <div
                  className="copy_btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(item.url);
                  }}
                >
                  {copied === item.url ? <DoneIcon sx={{ color: "white" }} /> : <ContentCopyIcon sx={{ color: "white" }} />}
                </div>
                <p className="flex-1 font-satoshi text-gray-300 font-medium text-sm truncate"> {item.url}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${article.summary !== "" && "my-8"} max-w-full flex justify-center items-center`}>
        {isFetching ? (
          <div className="flex flex-col justify-center items-center gap-1 ">
            {!translate ? (
              <h2 className="text-white desc">Запрос обрабатывается..</h2>
            ) : (
              <h2 className="text-white desc">Переводим и формируем результат..</h2>
            )}

            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          </div>
        ) : error ? (
          <p className="font-inter font-bold text-red-500 text-center">
            Ошибка
            <br />
            <span className=" font-normal text-white">{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-white text-xl">
                Главное из <span className="blue_gradient">статьи:</span>
              </h2>
              <div className="summary_box flex">
                {!copied === true ? (
                  <ContentCopyIcon
                    className="cursor-pointer"
                    sx={{ color: "white" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(article.summary);
                    }}
                  />
                ) : (
                  <DoneIcon sx={{ color: "white" }} />
                )}

                <p className="font-inter font-medium text-sm text-gray-300 ">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
      {allArticles.length === 0 && <Example />}
    </section>
  );
};

export default Main;
