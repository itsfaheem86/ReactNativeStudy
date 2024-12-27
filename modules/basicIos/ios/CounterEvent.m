//
//  CounterEvent.m
//  basicIos
//
//  Created by Abdul Saleem Mohamed Faheem on 2024-12-27.
//

#import <Foundation/Foundation.h>

//This will help us export function to react native
#import "React/RCTEventEmitter.h"

// Expose counter event object
@interface RCT_EXTERN_MODULE(CounterEvent,RCTEventEmitter)

// Expose increment method
RCT_EXTERN_METHOD(increment:(RCTResponseSenderBlock)callback)

// Expose decrement promise
RCT_EXTERN_METHOD(decrement:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
