package com.whereismycar.modules.map

import android.content.Context
import android.view.LayoutInflater
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.whereismycar.R

class MapViewManager: ViewGroupManager<MapViewComponent>() {
    override fun getName(): String = "RCTMapView"

    override fun createViewInstance(reactContext: ThemedReactContext): MapViewComponent {
        return MapViewComponent(reactContext);
        //val inflater = reactContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        //return inflater.inflate(R.layout.test_layout, null) as FrameLayout
    }

}