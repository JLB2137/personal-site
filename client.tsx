import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'lw1dsrji',
    dataset: 'production',
    apiVersion: '2022-10-25', // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
  })