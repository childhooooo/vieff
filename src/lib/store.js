const {app} = require('electron')
const path = require('path')
import Status from './status.js'

const store = () => {

  const state = {
    main: null,
    window: null,
    tray: null,
    notification: null,
    timer: null,
    dir: '',
    shortcut: '',
    status: Status.STANDBY,
    count: 0,
    task: null,
    tasks: [],
    rawTasks: '',
    events: [],
    second: 1000,
    unit: 500,
    minute: 1000 * 60,
    extendMinutes: 5
  }

  const mutations = {
    setConfig: (name, value) => {
      state[name] = value
    },
    setUi: (name, value) => {
      state[name] = value
    },
    setTimer: (timer) => {
      state.timer = timer
    },
    clearTimer: () => {
      state.timer = null
    },
    setStatus: (status) => {
      state.status = status
    },
    setCount: (count) => {
      state.count = count
    },
    stepCount: () => {
      if(state.count > 0) {
        state.count -= state.unit
      }
    },
    extendCount: () => {
      state.count += state.extendMinutes * state.minute
    },
    newTask: (task) => {
      state.task = task
      state.count = task.time * state.minute
    },
    clearTask: () => {
      state.task = null
      state.count = 0
    },
    setTasks: (raw, tasks) => {
      state.tasks = tasks
      state.rawTasks = raw
    },
    shiftEvent: () => {
      state.events = state.events.slice(1)
    },
    pushEvent: (eventName) => {
      state.events.push(eventName)
    }
  }

  return {
    state,
    mutations
  }
}

export default store()
