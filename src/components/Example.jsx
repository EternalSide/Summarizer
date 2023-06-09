import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

const Example = () => {
  const [copied, setCopied] = useState("");
  const demoUrl = `https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd`;



  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Поиск */}
      <div className="flex flex-col w-full gap-3">
        {/* Url History */}
        <div className="flex flex-col gap-2 overflow-y-auto ">
          <h2 className="font-satoshi font-bold text-white text-xl">
            Демо <span className="blue_gradient">запрос</span>
          </h2>
          <div className="link_card" onClick={() => {}}>
            <div
              className="copy_btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(demoUrl);
              }}
            >
              {copied === demoUrl ? <DoneIcon sx={{ color: "white" }} /> : <ContentCopyIcon sx={{ color: "white" }} />}
            </div>

            <p className="flex-1 font-satoshi text-gray-300 font-medium text-sm truncate">
              https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd
            </p>
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div className="mt-10 max-w-full flex justify-center items-center ">
        <div className="flex flex-col gap-3">
          <h2 className="font-satoshi font-bold text-white text-xl">
            Так будет выглядеть самое главное из <span className="blue_gradient">статьи:</span>
          </h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-300">
              The article compares how React and Vue handle adding, removing, and changing data, passing data through props from parent to
              child, and sending data from child to parent through event listeners. The article shows examples of how to create and delete
              to-do items in both frameworks, and how to handle event listeners. The article also explains the differences between Vue's
              data object and React's state object, and how to mutate data in both frameworks. The article concludes by stating that while
              there are many differences and quirks between the two frameworks, the article provides a foundation for understanding how they
              handle these tasks. The article also provides links to updated versions of the comparison using React Hooks and Vue
              Composition API, as well as comparisons with other frameworks such as Angular, Svelte, HyperApp, AppRun, LitElement,
              Hyperstack, and Stimulus + Rails. The article encourages readers to fork the styles used in the article and make their own
              equivalent piece, and to let the author know so that a link can be added to their article. The article also provides Github
              links to both the Vue ToDo and React ToDo apps, and a link to a talk given by the author about the article at London Web
              Performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;
