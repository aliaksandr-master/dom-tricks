import once from 'lodash/once';
import isNumber from 'lodash/isNumber';
import iterate from './forEach';
import onDelay from './onDelay';
import { one } from './on';



const INTERVAL = 1000;


const toMS = (valueInSeconds) => Math.floor(valueInSeconds * 1000);


export default (element, callback) => {
  iterate(element, (videoElement) => {
    let accumulatedTime = 0;
    let offDelay = () => {};
    let offClick = () => {};

    const stop = once(() => {
      offClick();
      offDelay();
    });

    const ping = (interval, prevTimePosition) => {
      offClick();
      // start next round of detect playing
      offDelay = onDelay(() => {
        const currTimePosition = videoElement.currentTime;

        if (!isNumber(currTimePosition)) {
          ping(interval, prevTimePosition);
          return;
        }

        let diff = currTimePosition - prevTimePosition;

        if (diff === 0) {
          ping(interval, prevTimePosition);
          return;
        } else if (diff < 0) {
          ping(interval, currTimePosition);
          return;
        } else if (diff > interval * 0.002) {
          ping(interval, currTimePosition);
          return;
        }

        diff = toMS(diff);

        accumulatedTime += diff;

        if (accumulatedTime > 500) {
          callback({
            mode: 'watch',
            interval: diff,
            interval_start: toMS(prevTimePosition),
            interval_stop: toMS(currTimePosition),
            video_duration: toMS(videoElement.duration),
            watched_time: accumulatedTime
          });
        }

        ping(interval, currTimePosition);
      }, interval);
    };

    ping(INTERVAL, 0);

    offClick = one(videoElement.parentNode, 'click', () => {
      const interval = 0.1 * 1000; // 0.1s

      callback({
        mode: 'activate',
        interval,
        interval_start: 0,
        interval_stop: interval,
        video_duration: toMS(videoElement.duration || 0) || (interval * 1000),
        watched_time: interval
      });
    });

    return stop;
  });
};
