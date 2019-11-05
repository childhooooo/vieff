const {app} = require('electron')
const path = require('path')
import Status from './status.js'

const store = () => {

  const state = {
    window: null,
    tray: null,
    notification: null,
    timer: null,
    dir: '',
    shortcut: '',
    status: Status.ACTIVE,
    count: 10000,
    task: {
      name: 'コーディング',
      time: 0
    },
    events: [],
    unit: 1000
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
      state.count += state.unit * 60 * 5
    },
    setName: (name) => {
      state.name = name
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
