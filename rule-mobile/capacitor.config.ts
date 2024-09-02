import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'rule.izakaya.app',
  appName: 'rule-izakaya',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
