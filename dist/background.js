// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.cdiscount.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});


let contentPort;
chrome.runtime.onConnect.addListener(function (portFrom) {
  chrome.extension.getBackgroundPage().console.log('connected');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'GET_PRODUCTS' }, function (
      response
    ) {
      // chrome.extension.getBackgroundPage().console.log(response.farewell);
    });
  });
  if (portFrom.name === 'background-content') {
    portFrom.onMessage.addListener(function (message) {
      // get products
      chrome.extension
        .getBackgroundPage()
        .console.log('message arrives', message);
      chrome.storage.local.set({ products: message.payload });
    });
  }
});
