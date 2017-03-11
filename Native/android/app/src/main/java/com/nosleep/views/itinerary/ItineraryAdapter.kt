package com.nosleep.views.itinerary

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.android.R

class ItineraryAdapter : RecyclerView.Adapter<ItineraryAdapter.Holder>() {
    val items = mutableListOf<ItineraryItem>()

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = items[position]
        holder.title.text = item.title
        holder.description.text = item.description
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater
                .from(parent.context)
                .inflate(R.layout.itinerary_item, parent, false)

        return Holder(view)
    }

    override fun getItemCount(): Int = items.size

    fun setItems(list: List<ItineraryItem>) {
        items.clear()
        items.addAll(list)
        notifyDataSetChanged()
    }

    class Holder(view: View) : RecyclerView.ViewHolder(view) {
        val title = view.findViewById(R.id.tv_title) as TextView
        val description = view.findViewById(R.id.tv_description) as TextView
    }
}