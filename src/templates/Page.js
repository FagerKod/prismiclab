import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import SliceZone from "../components/SliceZone"

const Page = ({ data }) => {
  if (!data) return null
  const document = data.allPrismicPage.edges[0].node
  const prismicNavigation = data.prismicNavigation
  console.log("prismicNav PAGE", prismicNavigation)

  const capitalizeFirstLetter = input => {
    return input[0].toUpperCase() + input.slice(1)
  }

  return (
    <Layout navigation={prismicNavigation}>
      <Seo title={capitalizeFirstLetter(document.uid)} />
      <SliceZone sliceZone={document.data.body} />
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($uid: String) {
    allPrismicPage(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          data {
            body {
              ... on PrismicPageDataBodyText {
                slice_type
                primary {
                  columns
                  content {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyQuote {
                slice_type
                primary {
                  quote {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyFullWidthImage {
                slice_type
                primary {
                  full_width_image {
                    url
                    gatsbyImageData
                    alt
                  }
                }
              }
              ... on PrismicPageDataBodyImageGallery {
                slice_type
                primary {
                  gallery_title {
                    raw
                  }
                }
                items {
                  image {
                    url
                    gatsbyImageData
                    alt
                  }
                  image_description {
                    raw
                  }
                  link {
                    url
                    type
                    uid
                  }
                  link_label {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyImageHighlight {
                slice_type
                primary {
                  featured_image {
                    url
                    gatsbyImageData
                    alt
                  }
                  title {
                    raw
                  }
                  description {
                    raw
                  }
                  link {
                    url
                    type
                    uid
                  }
                  link_label {
                    raw
                  }
                }
              }
            }
          }
        }
      }
    }
    prismicNavigation {
      ...HeaderQuery
    }
  }
`

export default Page