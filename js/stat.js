//stat.js
'use strict';


var histogramHeight = 150;
var barWidth = 40;
var indent = 50;
var initialX = 150;
var initialY = 250;
var lineHeight = 15;

var getMaxElement = function (arr) {
  var max = -1;
  var maxIdx = -1;
  for(var i = 0; i < arr.length; i++) {
    var time = arr[i];
    if (time > max) {
      max = time;
      maxIdx = i;
    }
  }
  return { max: max, maxIdx: maxIdx };
};

var getMinElement = function (arr) {
  var min = Infinity;
  var minIdx = -1;
  for(var i = 0; i < arr.length; i++) {
    var time = arr[i];
    if (time < min) {
      min = time;
      minIdx = i;
    }
  }
  return { min: min, minIdx: minIdx };
};

window.renderStatistics = function(ctx, names, times) {
  ctx.fillStyle ='rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420,270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420,270);
  ctx.fillRect(100, 10, 420, 270);

  var getMaxTime = getMaxElement(times);
  var getMinTime = getMinElement(times);

  var step = histogramHeight / (getMaxTime.max - 0);

  var renderBarChart = function () {
    for (var i = 0; i < times.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, '+ (Math.random() * (1 - 0.1) + 0.1) + ')';
      }

      ctx.fillRect(initialX + indent * i, initialY - times[i] * step, barWidth, times[i] * step);
      ctx.fillText(names[i], initialX + indent * i, initialY + lineHeight);
      ctx.fillText(times[i].toFixed(0), initialX + indent * i, (initialY - times[i] * step) - lineHeight / 2);
    }
  };

 var showWinner = function () {
   ctx.font = '16px, PT Mono';
   ctx.fillStyle = 'black';
   for (var i = 0; i < times.length; i++) {
     if (times[i] === getMinTime.min) {
       if (names[i] === 'Вы') {
         ctx.fillText('Ура вы победили!', 120, 50);
       } else {
         ctx.fillText('Список результатов:', 120, 70);
       }
       return;
     }
   }
 };

  renderBarChart();
  showWinner();
};
