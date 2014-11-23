define([], function() {
  return [
    ['radio(/)',      ['Radio', 'index']],
    ['ui(/)',         ['UI', 'index']],
    ['data/views/:cid(/)', ['UI', 'showView']],
    ['data(/)',       ['Data', 'index']],
    ['data/models/:cid(/)', ['Data', 'showModel']],
    ['activity(/)',   ['Activity', 'index']],
  ];
})
