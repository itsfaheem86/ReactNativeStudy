package com.basicandroid

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise

class CounterModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private var counter = 0

    override fun getName(): String {
        // The name we can access inside native modules
        return "Counter"
    }

    // Expose increment method
    @ReactMethod
    fun increment(callback: Callback) {
        counter++
        // Call the callback with the updated counter value
        callback.invoke(counter)
    }

    // Expose decrement method as a Promise
    @ReactMethod
    fun decrement(promise: Promise) {
        if (counter > 0) {
            counter--
            promise.resolve(counter) // Resolve the promise with the updated counter value
        } else {
            promise.reject("COUNTER_ERROR", "Counter value cannot be less than 0")
        }
    }
}
