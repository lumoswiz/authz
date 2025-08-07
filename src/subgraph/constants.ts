export const SUBGRAPH_URL = "https://gnosisguild.squids.live/roles:production/api/graphql"

export const ROLE_QUERY = `
  query Role($id: ID!) {
    role(id: $id) {
      key
      members {
        member {
          address
        }
      }
      targets {
        address
        clearance
        executionOptions
        functions {
          selector
          executionOptions
          wildcarded
          condition {
            id
            json
          }
        }
      }
      annotations {
        uri
        schema
      }
      lastUpdate
    }
  }
`.trim()
