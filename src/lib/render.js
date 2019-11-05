import Timer from './timer.js'
import Status from './status.js'

function update(store) {
  store.state.tray.setTitle(store.state.task.name + ' ' + Timer.display(store.state.count))

  if(store.state.status === Status.FINISH) {
    store.state.notification.show()
    store.mutations.setStatus(Status.STANDBY)
  }
}

export default {
  update
}
