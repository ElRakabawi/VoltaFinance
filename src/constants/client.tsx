import * as prod from './prod.json'
import * as dev from './dev.json'

const CONSTANTS = import.meta.env.MODE === "development" ? dev : prod

export default CONSTANTS