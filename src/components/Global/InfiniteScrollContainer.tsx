import { useInView } from "react-intersection-observer";
interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
  rootMargin?: string;
}

const InfiniteScrollContainer = ({
  className,
  onBottomReached,
  children,
  rootMargin = "200px",
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: rootMargin,
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });
  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollContainer;
