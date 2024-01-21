import { Client, fql, Query as q } from "fauna";

const client = new Client({ secret: "fnAFW3-_vgAAQMValMUPzvmAMX4r1Gdk4wgG2Val"});
const collectionName = "myReferences";

export const AddReferenceToFauna = async (inputValues) => {
  console.log(inputValues)
  try {
    // const { data } = await client.query(fql`Collection.byName(${collectionName})`)
    const document_query = fql`
      myReferences.create(${inputValues}) {
        id,
        ts,
        name
      }
    `;
    console.log("foi")
    await client.query(document_query);
  } catch (error) {
    console.log(error)
  }
}
