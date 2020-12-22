import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from '@/utils/debounce'

import { CircleTimeWrapper, TimeContent, TimeItem } from './CircleTime.styled'
import { BaseCircleTimeProps } from './CircleTime.types'

const CircleTime: FC<BaseCircleTimeProps> = () => {
  const timeItems = new Array(59)
    .fill(undefined)
    .map((_, index) => (index < 9 ? '0' + (index + 1) : `${index + 1}`))

  const contextRef = useRef(document.createElement('div'))
  const [disableScroll, setDisableScroll] = useState<boolean>(false)
  const [scrollHeight, setScrollHeight] = useState<number>(0)
  const [scrollPos, setScrollPosition] = useState<number>(0)
  const [clonesHeight, setClonesHeight] = useState<number>(0)

  const getScrollPos = () => {
    if (!contextRef.current) return

    const _scrollPos =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (contextRef.current.pageYOffset || contextRef.current.scrollTop) -
      (contextRef.current.clientTop || 0)

    // console.log( '_scrollPos', _scrollPos);
    setScrollPosition(_scrollPos)
  }

  const setScrollPos = (pos: number) => {
    if (contextRef.current) {
      contextRef.current.scrollTop = pos
      console.log('contextRef.current.scrollTop: ', pos)
    }
  }

  const getClonesHeight = useCallback(() => {
    const clones = window.document.querySelectorAll('.is-clone')

    let clonesHeightTotal = 0

    for (let i = 0; i < clones.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clonesHeightTotal = clonesHeightTotal + clones[i].offsetHeight
    }

    return clonesHeightTotal
  }, [])

  const reCalc = useCallback(() => {
    if (contextRef && contextRef.current && contextRef.current.scrollHeight)
      setScrollHeight(contextRef.current.scrollHeight)

    const _clonesHeight = getClonesHeight() || 0
    setClonesHeight(_clonesHeight)

    if (scrollPos <= 0) {
      setScrollPos(1) // Scroll 1 pixel to allow upwards scrolling
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!disableScroll) {
      if (clonesHeight + scrollPos >= scrollHeight) {
        // Scroll to the top when you’ve reached the bottom
        setScrollPos(1) // Scroll down 1 pixel to allow upwards scrolling
        setDisableScroll(true)
      } else if (scrollPos <= 0) {
        console.log(
          'scrollPos <= 0: ',
          scrollHeight,
          clonesHeight,
          scrollHeight - clonesHeight
        )

        // Scroll to the bottom when you reach the top
        setScrollPos(scrollHeight - clonesHeight)
        setDisableScroll(true)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPos])

  useEffect(() => {
    if (disableScroll) {
      // Disable scroll-jumping for a short time to avoid flickering
      window.setTimeout(() => {
        setDisableScroll(false)
      }, 40)
    }
  }, [disableScroll])

  useEffect(() => {
    reCalc()

    contextRef.current.addEventListener(
      'scroll',
      () => {
        window.requestAnimationFrame(getScrollPos)
      },
      false
    )

    window.addEventListener(
      'resize',
      debounce(() => {
        window.requestAnimationFrame(reCalc)
      }, 200),
      false
    )

    return () => {
      contextRef.current.removeEventListener('scroll', () => {
        window.requestAnimationFrame(getScrollPos)
      })

      window.removeEventListener('resize', () => {
        window.requestAnimationFrame(reCalc)
      })
    }
  }, [reCalc])

  return (
    <CircleTimeWrapper className="Loop js-loop" ref={contextRef}>
      {timeItems.map((item, index) => (
        <TimeItem key={item + index}>
          <TimeContent>{item}</TimeContent>
        </TimeItem>
      ))}

      <TimeItem className="green is-clone">
        <TimeContent>01</TimeContent>
      </TimeItem>
      <TimeItem className="red is-clone">
        <TimeContent>02</TimeContent>
      </TimeItem>
    </CircleTimeWrapper>
  )
}

export default CircleTime
