import React from "react"

class SeedInput extends React.Component {
  render() {
    return (
      <input
        id="rngseed"
        type="text"
        name="rngseed"
        size={10}
        placeholder="Enter Seed"
      />
    )
  }
}

export default SeedInput
