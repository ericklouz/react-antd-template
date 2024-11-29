import { ReactNode } from 'react';

type Props = {
  animationDuration: number;
  isFinished: boolean;
  children: ReactNode;
};

function NContainer({ animationDuration, children, isFinished }: Props) {
  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}ms linear`
      }}
    >
      {children}
    </div>
  );
}

export default NContainer;
