import React from 'react'
import styled from '@emotion/styled'

export default function Page({ children }) {
  const Paper = styled.div`
    width: 21cm;
    height: 29.7cm;
  `
  return (
    <Paper className="page flex bg-white shadow-2xl mx-auto mt-12">
      {children}
    </Paper>
  )
}
