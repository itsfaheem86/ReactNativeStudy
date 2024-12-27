//
//  Counter.swift
//  basicIos
//
//  Created by Abdul Saleem Mohamed Faheem on 2024-12-27.
//

import Foundation

// This to make sure to export these class/function to object c runtime
@objc(Counter)
class Counter: NSObject{
  private var count = 0;
  
//  _ is to get first param, callback to get second param
  @objc
  func increment(_ callback: RCTResponseSenderBlock){
    count += 1;
//    print(count);
    callback([count])
  }
  
  @objc
  func decrement(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
    if(count==0){
      let error = NSError(domain: "Counter", code: 200, userInfo: nil);
      reject("ERROR_COUNT", "count cannot be negative", error)
    }else {
      count -= 1;
      resolve(count);
    }
  }
  
  // This means we are asking react native to initialize these modules before JS main thread start executing
  // if returns false this means it's ok if we initialize the module in background thread
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  // This can be accessed using getConstants in react native side
  @objc
  func constantsToExport() -> [String: Any]!{
    return ["initialCount": 0];
  }
}
