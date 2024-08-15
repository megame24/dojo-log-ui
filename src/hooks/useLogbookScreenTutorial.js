import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useLogbookScreenTutorial = (
  logbookName,
  heatmapReady,
  rightFloatingButtonRef,
  leftFloatingButtonRef,
  monthlyHeatmapRef,
  monthlyYearlyDropdownRef,
  screenRef
) => {
  const inserts = useSafeAreaInsets();
  const tutorialOverlayContentDefault = [
    {
      position: 1,
      tooltipHeader: 'Logbook tutorial',
      tooltipText:
        'Click the next button to start the tutorial and learn how logbooks work!',
      pulseVisible: false,
      tooltipContainerPosition: { x: 70 },
      pulsePosition: { x: 0, y: 0 },
    },
    {
      position: 2,
      tooltipHeader: 'Daily progress and goals',
      tooltipContainerPosition: { x: 50 },
      pulseVisible: true,
    },
    {
      position: 3,
      tooltipHeader: 'Logbook calender view',
      tooltipText:
        'Once created, progress logs and goals will appear on this calendar view on their respective dates.\nTap any cell to interact with it.',
      tooltipContainerPosition: { x: 70 },
      pulseVisible: true,
    },
    {
      position: 4,
      tooltipHeader: 'Monthly / Yearly view',
      tooltipText:
        'Select "monthly" or "yearly" from this dropdown to view your progress and goals for each month or the entire year."',
      tooltipContainerPosition: { x: 70 },
      pulseVisible: true,
    },
    {
      position: 5,
      tooltipHeader: 'Month navigation',
      tooltipText:
        'Use this dropdown to view your progress and goals from previous months or your goals for future months.',
      tooltipContainerPosition: { x: 70 },
      pulseVisible: true,
    },
    {
      position: 6,
      tooltipHeader: 'Year navigation',
      tooltipText:
        'Use this dropdown to view your progress and goals from previous years or your goals for future years.',
      tooltipContainerPosition: { x: 70 },
      pulseVisible: true,
    },
    {
      position: 7,
      tooltipHeader: 'Edit your logbook',
      tooltipText: 'Click this button to edit or delete your logbook.',
      tooltipContainerPosition: { x: 57 },
      pulseVisible: true,
    },
    {
      position: 8,
      tooltipHeader: 'Logbook Preferences',
      tooltipText:
        'Click this button to set your logbook preferences, including daily reminders, default values like the quick log progress message, and more."',
      tooltipContainerPosition: { x: 75 },
      pulseVisible: true,
    },
  ];
  const callToActionContentDefault = {
    text: "Get started by setting a goal.\nOr logging today's progress.",
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
    if (logbookName) {
      tutorialOverlayContent[1].tooltipText = `When you make progress on your "${logbookName}" or want to set a goal, click this button to log daily progress and set new goals.`;
    }
  }, [logbookName]);

  useEffect(() => {
    setTimeout(() => {
      if (monthlyHeatmapRef.current) {
        if (rightFloatingButtonRef.current) {
          rightFloatingButtonRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              tutorialOverlayContent[1].pulsePosition = {
                y: pageY - 20,
                x: pageX - 20,
              };
              tutorialOverlayContent[1].tooltipContainerPosition.y =
                pageY - 200;

              tutorialOverlayContent[6].pulsePosition = {
                y: pageY - 74,
                x: pageX - 17,
              };
              tutorialOverlayContent[6].tooltipContainerPosition.y =
                pageY - 218;

              callToActionContent.position = {
                top: pageY - 5,
                right: pageX - 200,
              };
              setCallToActionContent(callToActionContent);
            }
          );
        }

        if (leftFloatingButtonRef.current) {
          leftFloatingButtonRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              tutorialOverlayContent[7].pulsePosition = {
                y: pageY - 20,
                x: pageX + 7,
              };
              tutorialOverlayContent[7].tooltipContainerPosition.y =
                pageY - 220;
            }
          );
        }

        monthlyYearlyDropdownRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            const pulseY = pageY - 23;
            const tooltipY = pageY + 50;
            tutorialOverlayContent[3].pulsePosition = {
              y: pulseY,
              x: pageX - 28,
            };
            tutorialOverlayContent[3].tooltipContainerPosition.y = tooltipY;

            tutorialOverlayContent[4].pulsePosition = {
              y: pulseY,
              x: pageX + 60,
            };
            tutorialOverlayContent[4].tooltipContainerPosition.y = tooltipY;

            tutorialOverlayContent[5].pulsePosition = {
              y: pulseY,
              x: pageX + 128,
            };
            tutorialOverlayContent[5].tooltipContainerPosition.y = tooltipY;
          }
        );
        screenRef.current.measure((x, y, width, height, pageX, pageY) => {
          tutorialOverlayContent[0].tooltipContainerPosition.y = pageY + 50;
        });

        monthlyHeatmapRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            tutorialOverlayContent[2].pulsePosition = {
              y: pageY + 75,
              x: pageX + 117,
            };
            tutorialOverlayContent[2].tooltipContainerPosition.y = pageY + 140;
            setTutorialOverlayContent(tutorialOverlayContent);
            setTutorialOverlayContentReady(true);
          }
        );
      }
    }, 1000);
  }, [heatmapReady]);

  return {
    tutorialOverlayContentReady,
    tutorialOverlayContent,
    callToActionContent,
  };
};

export default useLogbookScreenTutorial;
