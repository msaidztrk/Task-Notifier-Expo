import { router } from 'expo-router';
import { Routes, RouteValues } from './routes';

export const navigateTo = (route: RouteValues): void => {
  router.navigate(route, { relativeToDirectory: true });
};