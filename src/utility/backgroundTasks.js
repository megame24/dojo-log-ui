import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const TASK_NAME = 'BACKGROUND_NOTIFICATION_TASK';

// Define the background task
TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Error handling notification:', error);
    return;
  }

  const notification = data.notification;

  // Schedule a local notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'From background!!',
      body: notification.request.content.body || 'You have a new notification',
      data: notification.request.content.data,
    },
    trigger: null, // Trigger immediately
  });
});

// Register the background notification task
Notifications.registerTaskAsync(TASK_NAME);
