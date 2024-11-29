import { useNProgress } from '@tanem/react-nprogress';

import Bar from './Bar';
import NContainer from './Container';

type Props = {
  isAnimating?: boolean;
};

function NProgress({ isAnimating }: Props) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  });

  return (
    <NContainer animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      {/* <NSpinner /> */}
      {/*
				This example doesn't use a spinner component so the UI stays
				tidy. You're free to render whatever is appropriate for your
				use-case.
			*/}
    </NContainer>
  );
}

export default NProgress;
