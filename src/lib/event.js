import Status from './status.js'

function update(store) {
  const event = store.state.events[0] ? store.state.events[0] : ''
  store.mutations.shiftEvent()
  switch(event) {
    case 'set':
      store.mutations.setCount(event.time)
      store.mutations.setStatus(Status.ACTIVE)
      break
    case 'pause':
      store.mutations.setStatus(Status.PAUSE)
      break
    case 'unpause':
      if(!store.state.status === Status.ACTIVE) store.mutations.stepCount()
      store.mutations.setStatus(Status.ACTIVE)
      break
    case 'extend':
      store.mutations.extendCount()
      if(store.state.status === Status.HOLD) store.mutations.setStatus(Status.ACTIVE)
      break
    case 'complete':
      store.mutations.setStatus(Status.DONE)
      break
    default:
      if(store.state.status !== Status.ACTIVE) break
      if(store.state.count == 0) store.mutations.setStatus(Status.FINISH)
      store.mutations.stepCount()
  }
}

export default {
  update
}
