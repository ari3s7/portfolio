export function Fog() {
  return (
    <div className="atmosphere-fog" aria-hidden="true">
      <svg
        className="atmosphere-fog-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <pattern
            id="fog-hatch"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-32)"
          >
            <path d="M0 1.2H10" stroke="#120e0a" strokeWidth="0.7" />
          </pattern>
        </defs>
        <g className="atmosphere-fog-layer atmosphere-fog-layer-a" fill="url(#fog-hatch)">
          <path d="M40 430C120 360 210 410 280 390C360 366 420 430 510 410C560 396 620 450 580 520C530 610 400 590 300 610C180 634 60 560 40 430Z" />
        </g>
        <g className="atmosphere-fog-layer atmosphere-fog-layer-b" fill="url(#fog-hatch)">
          <path d="M720 360C820 320 940 370 1040 340C1120 318 1180 390 1140 470C1090 570 960 540 860 560C740 584 660 500 720 360Z" />
        </g>
        <g className="atmosphere-fog-layer atmosphere-fog-layer-c" fill="url(#fog-hatch)">
          <path d="M280 180C360 140 460 170 540 150C620 128 700 190 660 250C610 330 500 310 400 324C300 338 220 270 280 180Z" />
        </g>
      </svg>
    </div>
  )
}
