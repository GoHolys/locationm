   package com.myreactnativeapp.gallery

   import com.facebook.react.bridge.ReactApplicationContext
   import com.facebook.react.bridge.ReactContextBaseJavaModule
   import com.facebook.react.bridge.ReactMethod
   import com.facebook.react.bridge.Promise

   class GalleryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

       override fun getName(): String {
           return "GalleryModule"
       }

       @ReactMethod
       fun openGallery(promise: Promise) {
           // Implementation to open the gallery
           promise.resolve("Gallery opened successfully!")
       }
   }