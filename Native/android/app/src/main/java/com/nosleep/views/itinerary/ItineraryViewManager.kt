package com.nosleep.views.itinerary

import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class ItineraryViewManager : SimpleViewManager<RecyclerView>() {
    override fun getName(): String = "Itinerary"

    override fun createViewInstance(reactContext: ThemedReactContext): RecyclerView {
        val rv = RecyclerView(reactContext)
        val adapter = ItineraryAdapter()
        rv.adapter = adapter
        rv.layoutManager = LinearLayoutManager(reactContext)

        val eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        rv.tag = eventEmitter

        return rv
    }

    @Suppress("unused")
    @ReactProp(name = "items")
    fun setItems(recyclerView: RecyclerView, readableArray: ReadableArray) {
        val indices = 0..readableArray.size() - 1
        val items = indices.fold(arrayListOf<ItineraryItem>()) { list, index ->
            val map = readableArray.getMap(index)
            val title = map.getString("title")
            val description = map.getString("description")
            list.add(ItineraryItem(title, description))

            list
        }

        val adapter = recyclerView.adapter as ItineraryAdapter
        adapter.setItems(items)
    }

    @Suppress("unused")
    @ReactProp(name = "clickHandler")
    fun setClickHandler(recyclerView: RecyclerView, func: String) {
        val adapter = recyclerView.adapter as ItineraryAdapter
        val eventEmitter = recyclerView.tag as DeviceEventManagerModule.RCTDeviceEventEmitter

        adapter.clickHandler = { index, item ->
            val params = Arguments.createMap()
            params.putInt("index", index)
            params.putString("title", item.title)
            params.putString("description", item.description)

            eventEmitter.emit(func, params)
        }
    }
}