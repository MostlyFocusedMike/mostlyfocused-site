The challenge is that you are given an array of positive and negative integers. Each one of these integers is the distance to an element you want to jump to. so:

```js
[-108.23, 1.13, 120.13]
```

That array implies that you are 108 pixels past the first element (since it's negative) only 1 pixel from the next, and 120 pixels from the third element. So the next distance returned should be 1.131, and if we wanted the prev distance it would be -108.23.

You can literally be at an element:

```js
[-580.10, -40.89, 0, 200.13, 289.13]
```

That implies you are literally at an element, so the next is 200.13 and the prev is -40.89

```js
function findNextOrPrev(topsOfElements, nextOrPrev)
```

If all numbers are negative and you want to go to the next one, return nothing, you're at the end of the line. If all numbers are positive and you want to go previous, return nothing, you're already at the start.

Basically, you don't know where you currently are. past elements are negative, forward elements are positive

- nextOrPrev conveys one or the other, it up to you how to do that (booleans, strings, numbers whatever)
- the 0 can come at any position or not at all
- if a number is between 1.0 and -1.0, that's a quirk, and it means that's your current element and you should treat it like 0.
- There can only ever be a single 0 (or close to it) number in the array
- The array will always be least to greatest, it may or may not include negatives.
