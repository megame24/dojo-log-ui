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
      title: notification.request.content.title || 'Notification',
      body: notification.request.content.body || 'You have a new notification',
      data: notification.request.content.data,
    },
    trigger: null, // Trigger immediately
  });
});

// Register the background notification task only once
(async () => {
  try {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    const isTaskRegistered = tasks.some((task) => task.taskName === TASK_NAME);

    if (!isTaskRegistered) {
      await Notifications.registerTaskAsync(TASK_NAME);
    }
  } catch (err) {
    console.error('Failed to register task:', err);
  }
})();
