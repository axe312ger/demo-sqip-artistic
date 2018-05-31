import React from 'react'
import PropTypes from 'prop-types'
import Image from 'gatsby-image'

import Polaroid from '../components/polaroid'

import './index.css'

const Layout = ({ children, data }) => {
  const images = data.images.edges.map(image => (
    <Polaroid image={image.node} key={image.node.name} />
  ))
  const background = data.background.edges[0].node
  return <div>
      <div style={{ position: `relative`, height: `66vw`, zIndex: 0 }}>
        <Image
          sizes={background.childImageSharp.sizes} alt={background.name} />
        <div>{images}</div>
      </div>
      <div style={{ padding: `5vw` }}>{children()}</div>
    </div>
}

Layout.propTypes = {
  children: PropTypes.object,
  data: PropTypes.object,
}

export default Layout

export const query = graphql`
         query SiteTitleQuery {
           images: allFile(filter: { sourceInstanceName: { eq: "images" }, ext: { eq: ".jpg" } }) {
             edges {
               node {
                 publicURL
                 name
                 childImageSharp {
                   sizes(maxWidth: 400, maxHeight: 400) {
                     ...GatsbyImageSharpSizes
                   }
                 }
               }
             }
           }
           background: allFile(filter: { sourceInstanceName: { eq: "background" }, ext: { eq: ".jpg" } }) {
             edges {
               node {
                 publicURL
                 name
                 childImageSharp {
                   sizes(maxWidth: 4000) {
                     ...GatsbyImageSharpSizes
                   }
                 }
               }
             }
           }
         }
       `
