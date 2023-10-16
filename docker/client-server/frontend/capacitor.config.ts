import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codingtechnyks.gps',
  appName: 'atm',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
