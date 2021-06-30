package com.whereismycar

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.whereismycar.modules.map.MapModule
import com.whereismycar.modules.map.MapViewManager
import java.util.Collections

class MainPackage : ReactPackage {
    override fun createViewManagers(
            reactContext: ReactApplicationContext
    ): List<ViewManager<out View, out ReactShadowNode<*>>> {
        return arrayListOf(MapViewManager())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return arrayListOf(MapModule(reactContext))
    }
}
