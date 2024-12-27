//
//  CounterEvent.swift
//  basicIos
//
//  Created by Abdul Saleem Mohamed Faheem on 2024-12-27.
//

import Foundation

@objc(CounterEvent)
class CounterEvent: RCTEventEmitter {
  private var count = 0

  @objc
  func increment(_ callback: RCTResponseSenderBlock) {
    count += 1
    callback([count])
    sendEvent(withName: "onIncrement", body: [count])
  }

  @objc
  func decrement(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if count == 0 {
      let error = NSError(domain: "Counter", code: 200, userInfo: nil)
      reject("ERROR_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve(count)
      sendEvent(withName: "onDecrement", body: [count])
    }
  }

  override func supportedEvents() -> [String]! {
    return ["onIncrement", "onDecrement"]
  }

  // We are overriding this because RCTEventEmitter has them
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  // We are overriding this because RCTEventEmitter has them
  @objc
  override func constantsToExport() -> [AnyHashable: Any]! {
    return ["initialCount": 0]
  }
}
