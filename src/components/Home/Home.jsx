import React from 'react'
import Fav from './Fav'
import Popular from './Popular'
import Discount from './Discount'
import Swiper from './Swiper'

export default function Home() {
  return (
    <div>
      <Swiper/>
      <Fav/>
      <Popular/>
      <Discount/>
    </div>
  )
}
