[![npm](http://img.shields.io/npm/v/dom-tricks.svg?style=flat-square)](https://www.npmjs.com/package/dom-tricks)
[![npm](http://img.shields.io/npm/l/dom-tricks.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-master/dom-tricks.svg?style=flat-square)](https://david-dm.org/aliaksandr-master/dom-tricks)
[![devDependency Status](https://david-dm.org/aliaksandr-master/dom-tricks/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-master/dom-tricks#info=devDependencies)

# dom-tricks

```shell
$ npm install dom-tricks --save
```

## usage

### append(element, hostElement)
```javascript
import append from 'dom-tricks/append';

const element = document.createElement('div');

const remove = append(element, document.body);

remove();
```

### bubbledFind(findFn, startElement, lastParent = null)
```javascript
import bubbledFind from 'dom-tricks/bubledFind';

bubbledFind((element) => hasClass(element), startElement);
```

### className(element, 'className')
```javascript
import { addClass, removeClass, hasClass } from 'dom-tricks/className';

addClass(element, 'some-class');
removeClass(element, 'some-class');
hasClass(element, 'some-class');

```

### elOffset(element)
```javascript
import elOffset from 'dom-tricks/elOffset';

const { top, left } = elOffset(element);
```

### elPosition(element)
```javascript
import elPosition from 'dom-tricks/elPosition';

const { top, left } = elPosition(element);
```

### remove(element)
```javascript
import remove from 'dom-tricks/remove';

remove(element);
```

### elScroll(element)
```javascript
import elScroll from 'dom-tricks/elScroll';

const { top, left, width, height } = elScroll(element);
```

### elSize
```javascript
import elSize from 'dom-tricks/elSize';

const { width, height } = elSize(element);
```

### isElVisible(element, rate = 1)
```javascript
import isElVisible from 'dom-tricks/isElVisible';

isElVisible(element, 2 / 3); 
```

### forEach(element, iterateor)
```javascript
import forEach from 'dom-tricks/forEach';

const count = forEach(document.getElementsByClassName('some'), () => {
  
});

```

### setHTML
```javascript
import setHTML from 'dom-tricks/setHTML';

setHTML(element, '<div></div>');
```

### setText
```javascript
import setText from 'dom-tricks/setText';
setHTML(element, 'some text');
```

### getValue
```javascript
import getValue from 'dom-tricks/getValue';

const valueString = getValue(element);
```

### insertHTML(element, html, method = 'beforeEnd')
```javascript
import insertHTML from 'dom-tricks/insertHTML';


insertHTML(element, '<div></div>');
```

### isTouchDevice
```javascript
import isTouchDevice from 'dom-tricks/isTouchDevice';

isTouchDevice(); // true/false
```

### map
```javascript
import map from 'dom-tricks/map';

const values = map(elements, (element) => {
  return getValue(element);
});
```

### on(element, eventName, handler, options)
```javascript
import on from 'dom-tricks/on';

const off = on(element, 'click', (ev) => {
  // do something
});

off();
```

### onAnyAction
```javascript
import onAnyAction from 'dom-tricks/onAnyAction';

const off = onAnyAction(() => {
  // do something
});

off();
```

### onDelay(fn, delay = 0)
```javascript
import onDelay from 'dom-tricks/onDelay';

const off = onDelay(() => {
  // do something
}, 300);

off();
```

### onHashChange
```javascript
import onHashChange from 'dom-tricks/onHashChange';

const off = onHashChange(({ from, to }) => {
  // do something
});

off();
```

### onImageMetaLoad(imageSrc, callback, maxTimeWaitingForLoading = 0)
```javascript
import onImageMetaLoad from 'dom-tricks/onImageMetaLoad';

const off = onImageMetaLoad([ 'some/url', { url: 'some/url' }, { url: 'some/url', width: 300, height: 300 } ], (err, images) => {
  const { width, height, url, $ratio } = images[0];
  // do something
}, 7000);

off();
```

### onLinkClick
```javascript
import onLinkClick from 'dom-tricks/onLinkClick';

const off = onLinkClick(element, (ev, done) => {
  // do something
  done();
});

off();
```
```

### onLoad
```javascript
import onLoad from 'dom-tricks/onLoad';

const off = onLoad(() => {
  // do something
});

off();
```

### onPageScroll
```javascript
import onPageScroll from 'dom-tricks/onPageScroll';
```

### onReady
```javascript
import onReady from 'dom-tricks/onReady';

const off = onReady(() => {
  // do something
});

off();
```

### onResize
```javascript
import onResize from 'dom-tricks/onResize';

const off = onResize(() => {
  // do something
});

off();
```

### onScrollProgress
```javascript
import onScrollProgress from 'dom-tricks/onScrollProgress';

const off = onScrollProgress(() => {
  // do something
});

off();
```

### onVideoPlaying
```javascript
import onVideoPlaying from 'dom-tricks/onVideoPlaying';

const off = onVideoPlaying(element, () => {
  // do something
});
```

### scrollEl
```javascript
import scrollEl from 'dom-tricks/scrollEl';

const element = scrollEl(); // document.body most of cases
```

### selectAllByClassName
```javascript
import selectAllByClassName from 'dom-tricks/selectAllByClassName';

const elements = selectAllByClassName(element, 'some');
```

### selectOneByClassName
```javascript
import selectOneByClassName from 'dom-tricks/selectOneByClassName';

const el = selectAllByClassName(element, 'some');
```

### setStyle
```javascript
import setStyle from 'dom-tricks/setStyle';

setStyle(element, 'transition', 'opacity 0.2s linear');
```

### Style
```javascript
import Style from 'dom-tricks/Style';

const style = Style();

style.set('.some { display: block; }');

style.cleanup();

style.destroy();
```

### viewportSize
```javascript
import viewportSize from 'dom-tricks/viewportSize';

const { width, height } = viewportSize();
```

### onOutClick(element, handlerOutsideClick, handlerInsideClick)

### onGlobalKeyPress(handler)

### onHover(element, enterHandler, leaveHandler)

### isSomeChild(elements, targetElement)
