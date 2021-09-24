// Toggles Easy Mode on Sandbox
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.invokeMethod({
      event: '/sandbox_hard/main',
      method: 'toggleFlag'
    })
  },
  methods: {
    toggleFlag() {
      if (
        !daapi.getGlobalFlag({ flag: 'sandboxHard' })
      ) {
        daapi.addGlobalAction({
          key: 'sandboxHard',
          action: {
            title: 'Sandbox Hard',
            icon: daapi.requireImage('/sandbox_hard/ace.svg'),
            isAvailable: true,
            process: {
              event: '/sandbox_hard/main',
              method: 'sandboxHard'
            }
          }
        })
      } else {
        daapi.addGlobalAction({
          key: 'sandboxHard',
          action: {
            title: 'Sandbox Easy',
            icon: daapi.requireImage('/sandbox_hard/allo.svg'),
            isAvailable: true,
            process: {
              event: '/sandbox_hard/main',
              method: 'sandboxEasy'
            }
          }
        })
      }
    },
    sandboxHard() {
      daapi.setGlobalFlag({ flag: 'sandboxHard', data: true })
      daapi.addModifier({ key:'household_health', id: 'sandboxHardMod', factor: 0.1 })
      daapi.invokeMethod({
        event: '/sandbox_hard/main',
        method: 'toggleFlag'
      })
    },
    sandboxEasy() {
      daapi.setGlobalFlag({ flag: 'sandboxHard', data: false })
      daapi.removeModifier({ key:'household_health', id: 'sandboxHardMod' })
      daapi.invokeMethod({
        event: '/sandbox_hard/main',
        method: 'toggleFlag'
      })
    }
  }
}
