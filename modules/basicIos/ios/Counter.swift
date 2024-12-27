//
//  Counter.swift
//  basicIos
//
//  Created by Abdul Saleem Mohamed Faheem on 2024-12-27.
//

import Foundation

//This to make sure to export these class/function to object c runtime
@objc(Counter)
class Counter: NSObject{
  private var count = 0;
  
  @objc
  func increment(){
    count += 1;
    print(count);
  }
}
