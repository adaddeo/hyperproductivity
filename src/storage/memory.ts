const LOCAL_STORAGE_KEY = 'databases'

const storeDatabases = (dbs: any) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dbs))
}

const loadDatabases = (): { [key: string]: any } => {
  let dbs = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (dbs) {
    return JSON.parse(dbs)
  } else {
    return {}
  }
}

const databases = loadDatabases()

export const createDatabase = (name: string) => {
  if (databases[name] === undefined) {
    databases[name] = {}
  } else {
    throw Error(`Database ${name} already exists.`)
  }
}

export const getDatabase = (name: string) => {
  if (databases[name] !== undefined) {
    return databases[name]
  } else {
    throw Error(`Database ${name} doesn't exist.`)
  }
}

export const insert = (dbName: string, key: string, value: any) => {
  if (databases[dbName][key] === undefined) {
    databases[dbName][key] = value
    storeDatabases(databases)
  }
}

export const update = (dbName: string, key: string, value: any) => {
  if (databases[dbName][key] !== undefined) {
    databases[dbName][key] = value
    storeDatabases(databases)
  }
}

export const del = (dbName:string, key: string) => {
  delete databases[dbName][key]
  storeDatabases(databases)
}
