This is a simple plugin which helps avoid the 
```
error: Multiple commands produce '.../ios/build/testapp/Build/Products/Debug-iphonesimulator/testapp.app/Assets.car':
```
error on expo by disabling some pod optimizations and downloading all pod
resources every time.

Install the plugin with 
```
npm install @driveapp/expo-plugin-pod-disable-paths
OR
yarn add @driveapp/expo-plugin-pod-disable-paths
```

Then make sure to add this line to your plugins section in your app.json / app.config.js / app.config.ts

```
{
  "name": "my app",
  "plugins": ["@driveapp/expo-plugin-pod-disable-paths"]
}
```
