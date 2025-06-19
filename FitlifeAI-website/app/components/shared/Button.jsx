import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style= {{ padding:20, backgroundColor: '#3A7CA5', alignSelf: 'center', alignItems: 'center', borderRadius: 8 , marginTop: 20, width:"60%"}}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20}}>{title}</Text>
    </TouchableOpacity>
  )
}

