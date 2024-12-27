//
//  Counter.m
//  basicIos
//
//  Created by Abdul Saleem Mohamed Faheem on 2024-12-27.
//

#import <Foundation/Foundation.h>

// This will help us export function to react native
#import "React/RCTBridgeModule.h"

// Expose counter object
@interface RCT_EXTERN_MODULE (Counter, NSObject)

// Expose increment method
RCT_EXTERN_METHOD(increment : (RCTResponseSenderBlock)callback)

// Expose decrement promise
// https://stackoverflow.com/questions/69313978/rn-module-in-swift-can-not-get-param
RCT_EXTERN_METHOD(decrement : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject)

@end
