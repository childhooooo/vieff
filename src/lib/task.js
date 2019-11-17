import Status from './status.js'
import Task from './task.js'
import Parser from './parser.js'

function update(store) {
  if(store.state.tasks.length <= 0) {
    store.mutations.clearTask()
    store.mutations.setStatus(Status.STANDBY)
    return
  }

  if(store.state.status === Status.STANDBY) {
    store.mutations.newTask(store.state.tasks[0])
    store.mutations.setStatus(Status.ACTIVE)
    return
  }

  if(search(store.state.task, store.state.tasks) >= 0) return

  store.mutations.newTask(store.state.tasks[0])
  if(store.state.status !== Status.ACTIVE && store.state.status !== Status.PAUSE) {
    store.mutations.setStatus(Status.ACTIVE)
  }
}

function search(task, tasks) {
  return tasks.findIndex((t) => t.name === task.name && t.time === task.time)
}

export default {
  update,
  search
}
