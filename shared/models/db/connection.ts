export interface DbConfig {
  user: string
  password: string
  server: string
  database: string
  options: {
    encrypt: boolean
    trustServerCertificate: boolean
  }
}

export interface ConnectionResult {
  success: boolean
  message: string
}
