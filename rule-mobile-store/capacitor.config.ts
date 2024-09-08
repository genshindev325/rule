import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'rule.store.app',
  appName: 'rule-izakaya-store',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
