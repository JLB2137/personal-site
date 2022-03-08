// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'lw1dsrji', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-10-21',
  useCdn: true // `false` if you want to ensure fresh data
})