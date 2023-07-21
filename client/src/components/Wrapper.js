function Wrapper({ className, children }) {
  return (
    <div
      className={`w-full max-w-[1280px] px-3 min-[426px]:px-5 md:px-8 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
