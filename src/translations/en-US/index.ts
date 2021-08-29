export const en_US = {
  translation: {
    actions: {
      addPhotos: "Add photos",
      save: "Save",
      edit: "Edit",
      createNew: "Create new",
      start: "Start",
      reset: "Reset",
      navigateTo: "Navigate to...",
      stopParking: "Stop parking",
      startParking: "Park car",
      getLocation: "Get location",
      previous: "Previous",
      next: "Next",
      launch: "Launch!",
      grantPermission: "Grant permission",
    },
    error: {
      permissions: "Something went wrong, please try again.",
    },
    permissions: {},
    empty: {
      history:
        "No inactive parkings here. You can create one on the Recent screen",
      recent: "No parking saved. You can create one with the button below",
    },
    screens: {
      location: {
        view: "View location",
        edit: "Edit location",
      },
      recent: "Recent",
      history: "History",
      map: "Map",
      intro: "Introduction",
      settings: "Settings",
      about: "About",
      app: "Yo, where is my car?",
    },
    about: {
      greeting: "Built with ❤️ by dlittig",
    },
    dialogs: {
      select_drivers: "Select drivers",
      delete_driver: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete",
      },
      delete_race: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete this race?",
      },
      delete_session: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete the session",
      },
      leave: {
        title: "Leave screen?",
        content:
          "You might have unsaved changes. Are you sure you want to leave the screen?",
      },
    },
    toasts: {
      delete_driver_in_use:
        "Can not delete driver who participated in sessions",
      change_driver_failed:
        "You can't edit the drivers list, because there are races already.",
      driver_name_empty: "The driver's name can't be empty!",
    },
    banner: {
      fastest_lap:
        "With the checkbox you can keep track of the fastest round driven.",
    },
    text: {
      location: {
        name: "Name",
        setReminder: "Set reminder",
        reminderDate: "Reminder date",
        hours: "Hours",
        minutes: "Minutes",
        paid: "Paid",
        unit: "Unit",
        notes: "Notes",
        parked: "Parked",
        reminder: "Reminder",
        photos: "Photos",
        photosHint: "You can see the photos in full size when tapping on them.",
      },
      settings: {
        intro: {
          title: "Intro",
          description: "Show the intro screen again",
        },
      },
      intro: {
        description: {
          title: 'Welcome to "Yo, where is my car?"',
          description:
            "With this app you can keep track of where you parked your car, remind yourself that a parking ticket is expiring soon and navigate to the parking location.",
        },
        location: {
          title: "Location permission",
          description:
            "We need location permission only to acquire your location, when you park your car. It is not used for anything else.",
        },
        notification: {
          title: "Notification permission",
          description:
            "We need notification permission to remind you of your expiring parking time.",
        },
        media: {
          title: "Media permission",
          description:
            "We need the media permission, so that you can easily add photos to your parking.",
          hint: "You can grant the permission later in the settings, too.",
        },
        launch: {
          title: "Awesome!",
          description:
            "You can now start using the app and save your parkings!",
        },
      },
    },
  },
};
