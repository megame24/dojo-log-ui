import { useEffect, useState } from 'react';

const useLogbooksScreenTutorial = (
  userFirstName,
  floatingButtonRef,
  screenRef
) => {
  const tutorialOverlayContentDefault = [
    {
      position: 1,
      tooltipHeader: `Welcome ${userFirstName}!`,
      tooltipText:
        "You'll need a logbook to represent your pursuits or activity.\nLogbooks enable you to capture and visualize your progress and goals, enhancing your consistency.",
      pulseVisible: false,
      tooltipContainerPosition: { x: 70 },
      pulsePosition: { x: 0, y: 0 },
    },
    {
      position: 2,
      tooltipHeader: 'Create a logbook',
      tooltipText: 'Click this button to create a logbook.',
      tooltipContainerPosition: { x: 50 },
      pulseVisible: true,
    },
  ];

  const callToActionContentDefault = {
    text: 'Start a journey, create a logbook.',
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
    setTimeout(() => {
      if (floatingButtonRef.current && screenRef.current) {
        screenRef.current.measure((x, y, width, height, pageX, pageY) => {
          tutorialOverlayContent[0].tooltipContainerPosition.y = pageY + 80;
        });

        floatingButtonRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            tutorialOverlayContent[1].pulsePosition = {
              y: pageY - 20,
              x: pageX - 20,
            };
            tutorialOverlayContent[1].tooltipContainerPosition.y = pageY - 170;

            callToActionContent.position = {
              top: pageY + 5,
              right: pageX - 200,
            };

            setCallToActionContent(callToActionContent);
            setTutorialOverlayContent(tutorialOverlayContent);
            setTutorialOverlayContentReady(true);
          }
        );
      }
    }, 1000);
  }, []);

  return {
    tutorialOverlayContentReady,
    tutorialOverlayContent,
    callToActionContent,
  };
};

export default useLogbooksScreenTutorial;
