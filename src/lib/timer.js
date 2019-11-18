function down(store) {
  clearInterval(store.state.timer)
  store.mutations.clearTimer()
}

function up(store, updaters) {
  if(!store.state.timer) {
    const timer = setInterval(() => updaters.map(u => u(store)), store.state.unit)
    store.mutations.setTimer(timer)
  }
}

function display(ms) {
  const ofSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(ofSeconds / 60)
  const seconds = ofSeconds - minutes * 60
  return minutes + ':' + ss(seconds)
}

function ss(s) {
  return ('0' + s).slice(-2)
}

export default {
  up,
  down,
  display
}
