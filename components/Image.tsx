import React, { useCallback } from 'react'
// Next
import NextImage, { ImageLoaderProps } from 'next/image'

type ImageProps = {
  layout: 'responsive' | 'intrinsic' | 'fixed'
  src: string
  width: number
  height?: never
  aspectRatio: '1:1' | '4:3' | '16:9'
  fit?: 'pad' | 'crop' | 'scale' | 'thumb' | 'fill'
}
type AspectRatio = '1:1' | '3:2' | '4:3' | '9:12' | '16:9'

const aspectRatioSelected = {
  '1:1': 1,
  '3:2': 2 / 3,
  '4:3': 3 / 4,
  '9:12': 12 / 9,
  '16:9': 9 / 16,
}

function callAspectRatio(aspectRatio: AspectRatio, width: number): number {
  const ratio = width * aspectRatioSelected[aspectRatio]
  return Math.floor(ratio)
}

export const Image = ({
  layout,
  src,
  width,
  aspectRatio,
  fit = 'scale',
}: ImageProps) => {
  const height = callAspectRatio(aspectRatio, width)
  const loader = useCallback(
    (args: ImageLoaderProps): string => {
      const loaderHight = callAspectRatio(aspectRatio, args.width)
      return `${args.src}?w=${args.width}&h=${loaderHight}&fit=${fit}`
    },
    [aspectRatio, fit]
  )
  return (
    <NextImage
      layout={layout}
      src={src}
      width={width}
      height={height}
      loader={loader}
    />
  )
}
