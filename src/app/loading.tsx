const loading = () => {
  return (
    <>
      <div
        id="loading-bg"
        className="flex items-center justify-center h-screen w-full"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="stroke-black dark:stroke-white"
            id="svg"
            width="117"
            height="71"
            viewBox="0 0 117 71"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              strokeLinecap="round"
              fillRule="evenodd"
              fontSize="9pt"
              strokeWidth="1mm"
              fill="none"
            >
              <path
                d="M 63.5 0 L 80.5 49 L 97.5 0 L 117 0 L 90.5 70 L 70.5 70 L 44 0 L 63.5 0 Z M 0 70 L 0 56.5 Q 7.8 57 16 57 A 6.33 6.33 0 0 0 17.561 56.818 A 4.437 4.437 0 0 0 19.65 55.65 A 4.499 4.499 0 0 0 20.878 53.298 A 6.562 6.562 0 0 0 21 52 L 21 14 L 8 14 L 8 0 L 39 0 L 39 52 A 33.137 33.137 0 0 1 38.616 57.231 Q 37.67 63.13 34.4 66.4 Q 30.755 70.045 24 70.802 A 33.736 33.736 0 0 1 20.25 71 Q 10.7 71 0 70 Z"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
          <div className="text-black dark:text-white text-base tracking-[12px] uppercase ml-5 font-semibold">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
};
export default loading;
