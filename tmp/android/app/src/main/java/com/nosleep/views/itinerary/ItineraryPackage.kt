package com.nosleep.views.itinerary

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class ItineraryPackage: ReactPackage {
    override fun createJSModules(): MutableList<Class<out JavaScriptModule>> {
        return arrayListOf()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<out NativeModule> {
        return arrayListOf()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext)
            : MutableList<out ViewManager<out View, out ReactShadowNode>> {
        return arrayListOf(ItineraryViewManager())
    }
}