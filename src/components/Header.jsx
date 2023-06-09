const Header = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <div className="flex items-center gap-1.5 ">
          <img src="../../public/favicon.ico" alt="Лого сайта" className="w-8  h-7" />
          <h1 className="text-xl text-white font-bold">Summarizer</h1>
        </div>
        <button type="button" className="black_btn" onClick={() => window.open("https://github.com/EternalSide")}>
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Резюмируй новости c<br className="max-md:hidden" />
        <span className="orange_gradient"> OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Упростите чтение с помощью Summarizer, приложение обобщения статей с открытым исходным кодом, которое превращает длинные статьи в
        четкие и краткие сводки.
      </h2>
    </header>
  );
};

export default Header;
