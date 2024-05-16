import { useEffect, useState } from 'react';

const useRewardsScreenTutorial = (floatingButtonRef, screenRef) => {
  const tutorialOverlayContentDefault = [
    {
      position: 1,
      tooltipHeader: 'Rewards! 🎁',
      tooltipText:
        "Think of rewards in Dojologs as treating yourself to a big bowl of ice cream after a long day's work.\nRewards are personal gifts you give yourself for achieving your goals.",
      pulseVisible: false,
      tooltipContainerPosition: { x: 70 },
      pulsePosition: { x: 0, y: 0 },
    },
    {
      position: 2,
      tooltipHeader: 'Create a Reward',
      tooltipText: 'Use this button to create a reward.',
      tooltipContainerPosition: { x: 50 },
      pulseVisible: true,
    },
  ];

  const callToActionContentDefault = {
    text: 'Rewards! Rewards!... Do it! create one.',
  };

  const [tutorialOverlayContent, setTutorialOverlayContent] = useState(
    tutorialOverlayContentDefault
  );
  const [callToActionContent, setCallToActionContent] = useState(
    callToActionContentDefault
  );
  const [tutorialOverlayContentReady, setTutorialOverlayContentReady] =
    useState(false);

  useEffect(() => {
    if (floatingButtonRef.current && screenRef.current) {
      screenRef.current.measure((x, y, width, height, pageX, pageY) => {
        tutorialOverlayContent[0].tooltipContainerPosition.y = pageY + 80;
      });

      floatingButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        tutorialOverlayContent[1].pulsePosition = {
          y: pageY - 20,
          x: pageX - 20,
        };
        tutorialOverlayContent[1].tooltipContainerPosition.y = pageY - 170;

        callToActionContent.position = { top: pageY + 5, right: pageX - 200 };

        setCallToActionContent(callToActionContent);
        setTutorialOverlayContent(tutorialOverlayContent);
        setTutorialOverlayContentReady(true);
      });
    }
  }, []);

  return {
    tutorialOverlayContentReady,
    tutorialOverlayContent,
    callToActionContent,
  };
};

export default useRewardsScreenTutorial;
