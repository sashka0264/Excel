import $ from '@core/dom';

export default function resizeHandler($root, e) {
  const $resizer = $(e.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const sideProp = type === 'col' ? 'bottom' : 'right';
  const sideValue = type === 'col' ?
    `-${$root.getHeight}px` :
    `-${$root.getWidth}px`;
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  });

  document.onmousemove = (event) => {
    if (type === 'col') {
      const delta = event.pageX - (coords.left + coords.width);
      value = delta + coords.width;
      $resizer.css({right: -delta + 'px'});
    } else {
      const delta = event.pageY - coords.bottom;
      value = delta + coords.height;
      $resizer.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'});
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = value + 'px');
    } else {
      $parent.css({height: `${value}px`});
      $root.findAll(`[data-col="${$parent.data.row}"]`)
          .forEach((el) => el.style.height = value + 'px');

      // performance increased by 8 times!
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}