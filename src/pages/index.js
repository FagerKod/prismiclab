import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import HomepageBanner from "../components/HomepageBanner"
import SliceZone from "../components/SliceZone"

const Homepage = ({ data }) => {
  if (!data) return null
  const document = data.allPrismicHomepage.edges[0].node.data

  const bannerContent = {
    title: document.banner_title,
    description: document.banner_description,
    link: document.banner_link,
    linkLabel: document.banner_link_label,
    background: document.banner_background,
  }

  return (
    <Layout isHomepage>
      <Seo title="Home" />
      <HomepageBanner bannerContent={bannerContent} />
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query Homepage {
    allPrismicHomepage {
      edges {
        node {
          data {
            banner_title {
              raw
            }
            banner_description {
              raw
            }
            banner_link {
              url
              type
              uid
            }
            banner_link_label {
              raw
            }
            banner_background {
              url
              gatsbyImageData
              alt
            }
            body {
              ... on PrismicHomepageDataBodyText {
                slice_type
                primary {
                  columns
                  content {
                    raw
                  }
                }
              }
              ... on PrismicHomepageDataBodyQuote {
                slice_type
                primary {
                  quote {
                    raw
                  }
                }
              }
              ... on PrismicHomepageDataBodyFullWidthImage {
                slice_type
                primary {
                  full_width_image {
                    url
                    alt
                    gatsbyImageData
                  }
                }
              }
              ... on PrismicHomepageDataBodyImageGallery {
                slice_type
                primary {
                  gallery_title {
                    raw
                  }
                }
                items {
                  image {
                    url
                    alt
                    gatsbyImageData
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
              ... on PrismicHomepageDataBodyImageHighlight {
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
  }
`

export default Homepage
