import React from "react"
import tw from "tailwind.macro"
import styled from "@emotion/styled"

const ButtonComponent = styled.button`
  ${tw`block text-white font-bold py-2 px-4 rounded mt-2 mb-2`}
  ${({ primary, secondary }) => {
    switch (true) {
      case primary:
        return tw`bg-purple-600 hover:bg-purple-700`
      case secondary:
        return tw`bg-gray-600 hover:bg-gray-700`
      default:
        return tw`bg-blue-600 hover:bg-blue-700`
    }
  }}
  ${props => (props.loading ? tw`text-red-300` : tw`text-gray-300`)}
`

export const Button = ({ children, ...props }) => {
  return <ButtonComponent {...props}>{children}</ButtonComponent>
}
