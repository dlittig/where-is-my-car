package com.whereismycar.modules.map

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MapModule : ReactContextBaseJavaModule {
    constructor(context: ReactApplicationContext) : super(context)

    override fun getName(): String = "MapModule"

    @ReactMethod
    fun test(callback: Callback) {
        callback.invoke("Test callback")
    }
}
