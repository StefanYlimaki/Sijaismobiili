import React, { useEffect, useState } from 'react'
import { Keyboard, TextInput, View, Button } from 'react-native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

const onSubmit = (seconds) => {
  Keyboard.dismiss()
  const schedulingOptions = {
    content: {
      title: 'This is a notification',
      body: 'This is the body',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
      data: {
        id: 20
      }
    },
    trigger: {
      seconds: seconds
    },
  }
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleNotificationAsync(
    schedulingOptions,
  )
}
const handleNotification = () => {
}


const TimerNotification = () => {
  const [text, onChangeText] = useState('')

  useEffect(() => {
    const listener = Notifications.addNotificationReceivedListener(handleNotification)
    return () => listener.remove()
  }, [])

  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Seconds"
        style={{fontSize: 30, borderWidth: 1, width: 300}}
        keyboardType="numeric"
      />
      <Button onPress={() => onSubmit(Number(text))} title="Schedule"/>
    </View>)
}

export default TimerNotification