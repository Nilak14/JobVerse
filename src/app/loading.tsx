import "server-only";
const Loading = () => {
  return (
    <main className="flex items-center justify-center h-dvh">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="198"
        height="198"
        style={{
          shapeRendering: "auto",
          display: "block",
        }}
      >
        <g>
          <path
            stroke="none"
            fill="#e9590c"
            d="M12 50A38 38 0 0 0 88 50A38 40.5 0 0 1 12 50"
          >
            <animateTransform
              values="0 50 51.25;360 50 51.25"
              keyTimes="0;1"
              repeatCount="indefinite"
              dur="0.9090909090909091s"
              type="rotate"
              attributeName="transform"
            />
          </path>
        </g>
      </svg>
    </main>
  );
};
export default Loading;
