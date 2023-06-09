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
    <section className="mt-6 w-full max-w-xl">
      {/* Поиск */}
      <div className="flex flex-col w-full gap-3">
        {/* Url History */}
        <div className="flex flex-col gap-2 overflow-y-auto ">
          <h2 className="font-satoshi font-bold text-white text-xl">
            <span className="blue_gradient">Демо запрос:</span>
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
              https://medium.com/the-nuance/why-midlife-is-going-to-be-especially-hard-on-millennials-dd4aba14e1f7
            </p>
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div className="my-6 max-w-full flex justify-center items-center ">
        <div className="flex flex-col gap-3">
          <h2 className="font-satoshi font-bold text-white text-xl">
            <span className="blue_gradient"> Результат:</span>
          </h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-300">
              В статье обсуждаются потенциальные проблемы, с которыми нынешнее поколение может столкнуться в среднем возрасте из -за их
              сочетания подросткового оптимизма и агрессивного индивидуализма. Автор ссылается на исследования, которые предполагают, что
              люди, которые имеют высокий уровень оптимизма и индивидуализма в их молодежи, с большей вероятностью испытывают депрессию и
              беспокойство в более позднем возрасте. Кроме того, эти люди могут бороться с чувством разочарования и невыполненных ожиданий с
              возрастом. В статье также подчеркивается влияние социальных сетей на психическое здоровье этого поколения. Платформы
              социальных сетей создали культуру сравнения и конкуренции, которая может усугубить чувство неадекватности и беспокойства.
              Автор отмечает, что это поколение первое, кто расти в социальных сетях, и долгосрочные последствия этого воздействия до сих
              пор неизвестны. В целом, статья предполагает, что нынешнее поколение может столкнуться с уникальными проблемами с возрастом из
              -за их воспитания и воздействия на социальные сети. Для людей важно знать об этих потенциальных проблемах и обращаться за
              поддержкой, когда это необходимо. Кроме того, в статье требуются дополнительные исследования о долгосрочных последствиях
              социальных сетей на психическое здоровье.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;
