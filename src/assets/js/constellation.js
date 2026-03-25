(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var container = document.getElementById('hero-constellation');
  if (!container) return;

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'absolute inset-0 w-full h-full pointer-events-none');
  svg.setAttribute('aria-hidden', 'true');
  container.appendChild(svg);

  var COLORS = ['#4BA3D4', '#2EEAB5'];

  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // Grid-based placement to ensure even distribution across the entire screen
  // Divide screen into cells, place one node per cell with jitter
  var cols = 7;
  var rows = 5;
  var cellW = 100 / cols;
  var cellH = 100 / rows;
  var nodes = [];

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      // ~75% chance to place a node in each cell (skip some for organic feel)
      if (Math.random() < 0.25) continue;

      var x = col * cellW + rand(cellW * 0.15, cellW * 0.85);
      var y = row * cellH + rand(cellH * 0.15, cellH * 0.85);

      // Varied sizes: ~15% large hubs, ~35% medium, ~50% small
      var sizeRoll = Math.random();
      var glowR, coreR;
      if (sizeRoll < 0.15) {
        glowR = rand(10, 16);
        coreR = rand(2.5, 3.5);
      } else if (sizeRoll < 0.5) {
        glowR = rand(5, 9);
        coreR = rand(1.5, 2.5);
      } else {
        glowR = rand(3, 5);
        coreR = rand(0.8, 1.5);
      }

      nodes.push({
        x: x,
        y: y,
        glowR: glowR,
        coreR: coreR,
        color: pick(COLORS),
        pulseClass: Math.random() < 0.5 ? 'hero-pulse' : 'hero-pulse-delay'
      });
    }
  }

  // Connect nearby nodes (max distance based on cell size)
  var connections = [];
  var maxDist = Math.sqrt(cellW * cellW + cellH * cellH) * 1.3;

  for (var i = 0; i < nodes.length; i++) {
    var connCount = connections.filter(function(c) { return c.from === i || c.to === i; }).length;
    if (connCount >= 3) continue;

    for (var j = i + 1; j < nodes.length; j++) {
      var connCountJ = connections.filter(function(c) { return c.from === j || c.to === j; }).length;
      if (connCountJ >= 3) continue;

      var dx = nodes[i].x - nodes[j].x;
      var dy = nodes[i].y - nodes[j].y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        connections.push({ from: i, to: j, dist: dist });
      }
    }
  }

  // Render connection lines
  connections.forEach(function(conn) {
    var line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', nodes[conn.from].x + '%');
    line.setAttribute('y1', nodes[conn.from].y + '%');
    line.setAttribute('x2', nodes[conn.to].x + '%');
    line.setAttribute('y2', nodes[conn.to].y + '%');
    line.setAttribute('stroke', '#4BA3D4');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('stroke-opacity', Math.max(0.03, 0.08 - conn.dist * 0.001).toFixed(3));
    svg.appendChild(line);
  });

  // Render node glows
  nodes.forEach(function(node) {
    var glow = document.createElementNS(NS, 'circle');
    glow.setAttribute('cx', node.x + '%');
    glow.setAttribute('cy', node.y + '%');
    glow.setAttribute('r', node.glowR);
    glow.setAttribute('fill', node.color);
    glow.setAttribute('fill-opacity', rand(0.03, 0.07).toFixed(3));
    glow.setAttribute('class', node.pulseClass);
    svg.appendChild(glow);
  });

  // Render node cores
  nodes.forEach(function(node) {
    var core = document.createElementNS(NS, 'circle');
    core.setAttribute('cx', node.x + '%');
    core.setAttribute('cy', node.y + '%');
    core.setAttribute('r', node.coreR);
    core.setAttribute('fill', node.color);
    core.setAttribute('fill-opacity', rand(0.12, 0.3).toFixed(3));
    svg.appendChild(core);
  });

  // Traveling particles — every connection gets one
  connections.forEach(function(conn, i) {
    var from = nodes[conn.from];
    var to = nodes[conn.to];
    var dur = rand(4, 8);
    var delay = rand(0, 10);
    var color = pick(COLORS);

    // Particle
    var particle = document.createElementNS(NS, 'circle');
    particle.setAttribute('fill', color);

    var animCx = document.createElementNS(NS, 'animate');
    animCx.setAttribute('attributeName', 'cx');
    animCx.setAttribute('values', from.x + '%;' + to.x + '%;' + to.x + '%');
    animCx.setAttribute('keyTimes', '0;0.7;1');
    animCx.setAttribute('dur', dur + 's');
    animCx.setAttribute('begin', delay + 's');
    animCx.setAttribute('repeatCount', 'indefinite');
    particle.appendChild(animCx);

    var animCy = document.createElementNS(NS, 'animate');
    animCy.setAttribute('attributeName', 'cy');
    animCy.setAttribute('values', from.y + '%;' + to.y + '%;' + to.y + '%');
    animCy.setAttribute('keyTimes', '0;0.7;1');
    animCy.setAttribute('dur', dur + 's');
    animCy.setAttribute('begin', delay + 's');
    animCy.setAttribute('repeatCount', 'indefinite');
    particle.appendChild(animCy);

    var animOp = document.createElementNS(NS, 'animate');
    animOp.setAttribute('attributeName', 'opacity');
    animOp.setAttribute('values', '0;0.5;0.5;0');
    animOp.setAttribute('keyTimes', '0;0.15;0.65;1');
    animOp.setAttribute('dur', dur + 's');
    animOp.setAttribute('begin', delay + 's');
    animOp.setAttribute('repeatCount', 'indefinite');
    particle.appendChild(animOp);

    var animR = document.createElementNS(NS, 'animate');
    animR.setAttribute('attributeName', 'r');
    animR.setAttribute('values', '1;2.5;1');
    animR.setAttribute('keyTimes', '0;0.5;1');
    animR.setAttribute('dur', dur + 's');
    animR.setAttribute('begin', delay + 's');
    animR.setAttribute('repeatCount', 'indefinite');
    particle.appendChild(animR);

    svg.appendChild(particle);

    // Arrival flash at destination node
    var flash = document.createElementNS(NS, 'circle');
    flash.setAttribute('cx', to.x + '%');
    flash.setAttribute('cy', to.y + '%');
    flash.setAttribute('fill', color);

    var flashR = document.createElementNS(NS, 'animate');
    flashR.setAttribute('attributeName', 'r');
    flashR.setAttribute('values', '0;0;0;' + (to.coreR + 5) + ';0');
    flashR.setAttribute('keyTimes', '0;0.6;0.7;0.85;1');
    flashR.setAttribute('dur', dur + 's');
    flashR.setAttribute('begin', delay + 's');
    flashR.setAttribute('repeatCount', 'indefinite');
    flash.appendChild(flashR);

    var flashOp = document.createElementNS(NS, 'animate');
    flashOp.setAttribute('attributeName', 'opacity');
    flashOp.setAttribute('values', '0;0;0;0.2;0');
    flashOp.setAttribute('keyTimes', '0;0.6;0.7;0.85;1');
    flashOp.setAttribute('dur', dur + 's');
    flashOp.setAttribute('begin', delay + 's');
    flashOp.setAttribute('repeatCount', 'indefinite');
    flash.appendChild(flashOp);

    svg.appendChild(flash);
  });
})();
