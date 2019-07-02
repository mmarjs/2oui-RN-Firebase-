package com.twooui;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

 protected static CallbackManager getCallbackManager() {
   return mCallbackManager;
 }

 private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
   @Override
   public boolean getUseDeveloperSupport() {
     return BuildConfig.DEBUG;
   }

   @Override
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
         new MainReactPackage(),
            new ReactVideoPackage(),
            new MapsPackage(),
            new RNI18nPackage(),
           new RNFirebasePackage(),
           new RNGooglePlacesPackage(),
           new ReactNativeWheelPickerPackage(),
           new PickerPackage(),
           new LinearGradientPackage(),
           new FBSDKPackage(mCallbackManager),
           new RNFirebaseStoragePackage(),
           new RNFirebaseAuthPackage(),
           new RNCameraPackage()
     );
   }

   @Override
   protected String getJSMainModuleName() {
     return "index";
   }
 };

 @Override
 public ReactNativeHost getReactNativeHost() {
   return mReactNativeHost;
 }

 @Override
 public void onCreate() {
   super.onCreate();
   SoLoader.init(this, /* native exopackage */ false);
 }
}