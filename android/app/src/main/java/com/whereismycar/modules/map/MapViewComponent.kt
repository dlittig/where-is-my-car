package com.whereismycar.modules.map

import android.util.Log
import android.widget.LinearLayout
import androidx.preference.PreferenceManager
import com.facebook.react.uimanager.ThemedReactContext
import com.whereismycar.R
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.views.MapView

class MapViewComponent(context: ThemedReactContext) : LinearLayout(context) {
    private var viewContext: ThemedReactContext = context

    init {
        this.render()
    }

    private fun render() {
        Configuration.getInstance()
            .load(this.viewContext, PreferenceManager.getDefaultSharedPreferences(this.viewContext))
        inflate(this.viewContext, R.layout.map_view_layout, this)

        val map: MapView = findViewById(R.id.map)
        map.setTileSource(TileSourceFactory.MAPNIK)
        Log.d("MapViewComponent", "done")
    }
}